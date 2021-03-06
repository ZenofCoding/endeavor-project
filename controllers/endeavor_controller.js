/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var passport = require('passport');
var endeavor = require('../models/endeavor.js');

// redirects user to /burgers
router.get('/', function (req, res) {
  res.redirect('/endeavors');
});

// accesses the all function in endeavor.js
// tells the index.handlebars to render and sends select all response as an object
router.get('/endeavors', function (req, res) {
  //endeavor.all(function (data) {
    //var hbsObject = { endeavors: data, user : req.user };
    var hbsObject = { user : req.user };
    console.log(hbsObject);
    res.render('index', hbsObject);
  //});
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/login', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('login', { 
    message: req.flash('loginMessage') 
  });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/login', // redirect back to the login page if there is an error
          failureFlash : true // allow flash messages
  }),
      function(req, res) {
          console.log("hello");

          if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
          } else {
            req.session.cookie.expires = false;
          }
      res.redirect('/');
  });

// show the login (STAY) form
router.get('/login/stay/:id/:user', function(req, res) {
  // var jobID = req.params.id;
  // var userJob = req.params.user;
  // render the page and pass in any flash data if it exists
  res.render('login-stay', { 
    message: req.flash('loginMessage'),
    jobID: req.params.id,
    userJob: req.params.user
  });
});

// process the login form
router.post('/login/stay', passport.authenticate('local-login-stay', {
    failureRedirect : 'back', // redirect back to the login page if there is an error
    failureFlash : true // allow flash messages
  }),
      function(req, res) {
          console.log("hello");

          if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
          } else {
            req.session.cookie.expires = false;
          }

          if(req.body.jobID == '0'){
            res.redirect('/public/profile/' + req.body.userJob + '/' + true); 
          }else{
            res.redirect('/viewJobAction/' + req.body.jobID +'/'+ req.body.userJob); 
          }
      
});

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/signup', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('signup', { message: req.flash('signupMessage') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

// =====================================
// PROFILE SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
  // res.render('profile', {
  //   user : req.user // get the user out of session and pass to template
  // });
  //var userObject = { user : req.user };
  var condition = 'userID = ' + req.user.id;
  var condition2 = 'employeeID = ' + req.user.id;
  endeavor.allWhere('jobs', condition, function (jobs) {
    endeavor.all('category', function (category) {
      endeavor.allWhere('resume', condition, function (resumes) {
        endeavor.allWhere('feedback', condition2, function (feedback) {
          res.render('profile', {
            user: req.user, 
            jobs: jobs,
            category: category,
            resumes: resumes,
            feedback: feedback
          });
        });  
      });
      //console.log(jobs, category);
    });
  });
  //console.log(req.user);
});

// =====================================
// PUBLIC PROFILE SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/public/profile/:owner', function(req, res) {
  // res.render('profile', {
  //   user : req.user // get the user out of session and pass to template
  // });
  //var userObject = { user : req.user };
  var condition = 'userID = ' + req.params.owner;
  var condition2 = 'employeeID = ' + req.params.owner;
  var condition3 = 'id = ' + req.params.owner;
  endeavor.allWhere('jobs', condition, function (jobs) {
    endeavor.manyWhere(['id', 'username', 'avatar', 'background', 'displayName', 'summary', 'displaySentence'], 'user', condition3, function (owner) {
      endeavor.allWhere('resume', condition, function (resumes) {
        endeavor.allWhere('feedback', condition2, function (feedback) {
          res.render('profile-public', {
            user: req.user,
            owner: owner, 
            jobs: jobs,
            resumes: resumes,
            feedback: feedback
          });
        });  
      });
      console.log(owner);
    });
  });
  //console.log(req.user);
});

// =====================================
// PUBLIC PROFILE SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/public/profile/:owner/:success', function(req, res) {
  // res.render('profile', {
  //   user : req.user // get the user out of session and pass to template
  // });
  //var userObject = { user : req.user };
  var condition = 'userID = ' + req.params.owner;
  var condition2 = 'employeeID = ' + req.params.owner;
  var condition3 = 'id = ' + req.params.owner;
  endeavor.allWhere('jobs', condition, function (jobs) {
    endeavor.manyWhere(['id', 'username', 'avatar', 'background', 'displayName', 'summary', 'displaySentence'], 'user', condition3, function (owner) {
      endeavor.allWhere('resume', condition, function (resumes) {
        endeavor.allWhere('feedback', condition2, function (feedback) {
          res.render('profile-public', {
            user: req.user,
            success: req.params.success,
            owner: owner, 
            jobs: jobs,
            resumes: resumes,
            feedback: feedback
          });
        });  
      });
      console.log(owner);
    });
  });
  //console.log(req.user);
});

// =====================================
// PREFERENCES SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/preferences', isLoggedIn, function(req, res) {
  var condition = 'userID = ' + req.user.id;
  endeavor.allWhere('jobs', condition, function (jobs) {
    endeavor.allWhere('resume', condition, function (resumes) {
    // var hbsObject = { endeavors: data, user : req.user };
    // console.log(hbsObject);
      res.render('preferences', {
        user: req.user, 
        jobs: jobs,
        resumes: resumes
      });
      console.log(jobs);
    });
  });
  console.log(req.user);
});
  
  // =====================================
  // PREFERENCES SUCCESS SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  router.get('/preferences/:success', isLoggedIn, function(req, res) {
    var condition = 'userID = ' + req.user.id;
    endeavor.allWhere('jobs', condition, function (jobs) {
      // var hbsObject = { endeavors: data, user : req.user };
      // console.log(hbsObject);
      res.render('preferences', {
        user: req.user, 
        jobs: jobs,
        success: req.params.success
      });
      // console.log(jobs);
    });
    // console.log(req.user);
  });
  // =====================================
  // JobSearch SECTION =========================
  // =====================================
  // all the available jobs posted on the site
    router.get('/jobsearch', function(req, res) {
     var condition = '';//'userID = ' + req.user.id;
       endeavor.all('jobs', function (jobs) {
         endeavor.all('category', function (category) {
           res.render('jobsearch', {
             user: req.user,
             jobs: jobs,
             category: category
           });
           console.log(jobs);
         });
       });
    });
  // =====================================
  // Hire SECTION =========================
  // =====================================
  // all the available users posted on the site
  router.get('/hire', function(req, res) {
      endeavor.all('category', function (category) {
        var Condition = 'employee = true';
          endeavor.allWhere('user', Condition, function (employee) {
              res.render('hire', {
                user: req.user,
                category: category,
                employee: employee
              });
           });
       });
  });

  // all the available users  on the site based on the category
 // router.get('/hire/:category', function(req, res) {
 //  var condition = 'category = "' + req.params.category +'"';
 //    endeavor.allWhere('userCategory', condition, function (userCategory) {
 //       var condition1 = 'id = "' + req.params.user +'"';
 //        endeavor.allWhere('user', condition, function (user) {
 //          res.render('hire', {
 //          user: req.user,
 //          category: category
 //        });
 //      });
 //    });  
 //  });
 //
 // renders the job that corresponds to the categoryID passed in request
router.get('/hire/:categoryID', function(req, res) {  
var categoryCondition = 'userCategory.categoryID = ' + req.params.categoryID;
var joinCondition = ' user.id = userCategory.userID AND user.employee = true';
   endeavor.joinTwotables(['user.id', 'user.avatar', 'user.displayName', 'user.summary', 'user.hasavatar', 'user.username'], 'userCategory', 'user', categoryCondition, joinCondition, function (userHire) {
    endeavor.all('category', function (category) {
    res.render('hire', {
      user: req.user,
      userHire: userHire,
      category: category
   }); 
     console.log(category);
  }); 
  console.log(userHire);
  });
});

 
  

 // all the available jobs posted on the site based on the category
 router.get('/jobCategory/:category', function(req, res) {
  var condition = 'category = "' + req.params.category +'"';
    endeavor.allWhere('jobs', condition, function (jobs) {
        endeavor.all('category', function (category) {
          res.render('jobsearch', {
          user: req.user,
          jobs: jobs,
          category: category
        });
      });
    });
  });
 //

 // all the available jobs posted on the site based on the subcategory
 router.get('/jobSubCategory/:id', function(req, res) {
  var condition = 'subcategory = "' + req.params.id +'"';
    endeavor.allWhere('jobs', condition, function (jobs) {
      endeavor.all('category', function (category) {
        res.render('jobsearch', {
          user: req.user,
          jobs: jobs,
          category: category
        });
      });
    });
});


// renders the job that corresponds to the jobID passed in request
router.get('/viewJob/:id/:user', function(req, res) {
var condition = 'jobID = ' + req.params.id;
var condition2 = 'id = ' + req.params.user;
var condition3 = 'jobOwnerID = ' + req.params.user;
var condition4 = 'bid.jobOwnerID = ' + req.params.user;
var condition5 = 'bid.jobID = jobs.jobID';
var condition6 = 'user.id = bid.userID';
var condition7 = 'jobs.jobID = ' + req.params.id;
  endeavor.allWhere('jobs', condition, function (job) {
    endeavor.allWhere('bid', condition3, function (bids) {
      endeavor.allWhere('feedback', condition, function (feedback) {
        endeavor.allWhere('user', condition2, function (postUser) {
          endeavor.innerJoin3(['user.id', 'user.avatar', 'user.username', 'user.displayName', 'bid.bidID', 'bid.jobID', 'bid.userID', 'bid.description', 'bid.amount', 'bid.bidType', 'bid.bidaccepted', 'bid.biddenied', 'bid.jobOwnerID'], 'user', 'bid', 'jobs', condition4, condition5, condition6, condition7, function (bidInfo) {
            if(req.user == undefined){
              res.render('job', {
                user: req.user,
                job: job,
                bids: bids,
                feedback: feedback,
                postUser: postUser,
                bidInfo: bidInfo
              }); 
              console.log('hello', feedback);
            }else{
              endeavor.all('category', function (category) {
                isOwner(req.params.user, req.user.id, function (owned) {
                  res.render('job', {
                    user: req.user,
                    job: job,
                    bids: bids,
                    feedback: feedback,
                    postUser: postUser,
                    bidInfo: bidInfo,
                    category: category,
                    owned: owned
                  });
                  console.log('hello', feedback);
                  //console.log(postUser, req.params.user, req.user);
                });
              });
            } 
          });
        });
      });  
    });
  });
});



// renders the job that corresponds to the jobID passed in request
// renders page for bidding and applying for jobs
router.get('/viewJobAction/:id/:user', isLoggedIn2, function(req, res) {
var condition = 'jobID = ' + req.params.id;
var condition2 = 'id = ' + req.params.user;
var condition3 = 'jobOwnerID = ' + req.params.user;
  endeavor.allWhere('jobs', condition, function (job) {
    endeavor.allWhere('bid', condition3, function (bids) {
      endeavor.allWhere('user', condition2, function (postUser) {
        endeavor.all('category', function (category) {
          res.render('job-action', {
            user: req.user,
            job: job,
            postUser: postUser,
            category: category
          });
          console.log('hello', bids);
          //console.log(category);
          //console.log(postUser, req.params.user, req.user);
        });         
      });
    });
  });
});
  // =====================================
  // LOGOUT ==============================
  // =====================================
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

// accesses the create function in endeavor.js
// passes the values from the index.handlebars form and passes the db column name
// redirects to .get /endeavors and reloads page
router.post('/job/create', function (req, res) {
  endeavor.create(['jobs'], ['title', 'description', 'userID', 'image', 'category', 'subcategory', 'bidding', 'jobstart', 'deadline', 'budget'], [req.body.job_title, req.body.job_description, req.body.user_id, req.body.image1, req.body.category, req.body.subcategory, req.body.bidding, req.body.start, req.body.end, req.body.budget], function () {
    res.redirect('/profile');
  });
});

// accesses the create function in endeavor.js
// passes the values from the index.handlebars form and passes the db column name
// redirects to .get /endeavors and reloads page
router.post('/job/bid', function (req, res) {
  endeavor.create(['bid'], ['description', 'userID', 'jobID', 'amount', 'bidType', 'jobOwnerID'], [req.body.bid_description, req.body.bid_userID, req.body.bid_jobID, req.body.bid_budget, req.body.bid_type, req.body.job_owner], function (result) {
    var condition = 'jobID = ' + req.body.bid_jobID;
    endeavor.update(['jobs'], { bidID: result.insertId, hasbid: req.body.hasbid_initial, bidderID: req.body.bid_userID}, condition, function () {
      endeavor.create(['notifications'], ['jobID', 'employerID', 'employeeID', 'notification', 'type'], [req.body.bid_jobID, req.body.job_owner, req.body.job_owner, req.body.note_Message, req.body.note_type], function () {
      // console.log('Resonse Logged', res.json(result));
        res.redirect('/profile');
      });
    });
  });
});

// accesses the update function in endeavor.js
// passes endeavor id
// redirects to .get /preferences with a value of true and shows success modal
router.put('/job/bid/accept/:jobID/:bidID/:bidderID', function (req, res) {
  var condition = 'jobID = ' + req.params.jobID;
  var condition2 = 'bidID = ' + req.params.bidID;
  var typeBidAccept = '1';
  console.log('condition', condition,'condition2', condition2);
  endeavor.updateString(['jobs'], { bidID: req.params.bidID, bidaccepted: req.body.accept_bid, bidderID: req.params.bidderID }, condition, function () {
    endeavor.updateString(['bid'], { bidaccepted: req.body.accept_bid }, condition2, function () {
      endeavor.create(['notifications'], ['jobID', 'employerID', 'employeeID', 'notification', 'type'], [req.params.jobID, req.body.employer, req.params.bidderID, req.body.note_bidAccept, typeBidAccept], function () {
        res.redirect('/profile');
      });
    });
  });
});

// accesses the update function in endeavor.js
// passes endeavor id
// redirects to .get /preferences with a value of true and shows success modal
router.put('/job/app/accept/:jobID/:appID/:applicantID', function (req, res) {
  var condition = 'jobID = ' + req.params.jobID;
  var condition2 = 'bidID = ' + req.params.appID;
  var typeAppAccept = '4';
  console.log('condition', condition,'condition2', condition2);
  endeavor.updateString(['jobs'], { bidID: req.params.appID, bidaccepted: req.body.accept_app, bidderID: req.params.applicantID }, condition, function () {
    endeavor.updateString(['bid'], { bidaccepted: req.body.accept_app }, condition2, function () {
      endeavor.create(['notifications'], ['jobID', 'employerID', 'employeeID', 'notification', 'type'], [req.params.jobID, req.body.employer, req.params.applicantID, req.body.note_ReviewMessage, typeAppAccept], function () {
        res.redirect('/profile');
      });
    });
  });
});

// accesses the update function in endeavor.js
// passes endeavor id
// redirects to .get /preferences with a value of true and shows success modal
router.put('/job/bid/reject/:bidID', function (req, res) {
  var condition = 'bidID = ' + req.params.bidID;
  var typeBidReject = '2';
  console.log('condition', condition);
  endeavor.updateString(['bid'], { biddenied: req.body.reject_bid }, condition, function () {
    endeavor.create(['notifications'], ['jobID', 'employerID', 'employeeID', 'notification', 'type'], [req.body.jobID, req.body.employer, req.body.employee, req.body.note_bidReject, typeBidReject], function () {
      res.redirect('back');
    });
  });
});

// accesses the update function in endeavor.js
// passes endeavor id
// redirects to .get /preferences with a value of true and shows success modal
router.put('/viewJob/:jobID/job/update/:id', function (req, res) {
  var condition = 'jobID = ' + req.params.id;
  console.log('condition', condition);
  endeavor.updateString(['jobs'], { title: req.body.edit_jobTitle, description: req.body.edit_jobDescription, image: req.body.edit_jobImage1, category: req.body.edit_jobCategory, subcategory: req.body.edit_jobSubcategory, bidding: req.body.edit_jobBidding, jobstart: req.body.edit_jobStart, deadline: req.body.edit_jobEnd, budget: req.body.edit_jobBudget }, condition, function () {
    res.redirect('back');
  });
});

// accesses the delete function in endeavor.js
// passes jobID
// redirects to .get /profile page
router.delete('/job/remove/:id', function (req, res) {
  var condition = 'jobID = ' + req.params.id;
  console.log('condition', condition);
  endeavor.delete(['jobs'], condition, function () {
    res.redirect('/profile');    
  });
});

// accesses the create function in endeavor.js
// passes the values from the index.handlebars form and passes the db column name
// redirects to .get /endeavors and reloads page
router.post('/professional/create', function (req, res) {
  endeavor.create(['resume'], ['userID', 'company', 'position', 'location', 'description', 'startdate', 'enddate'], [req.body.user_id, req.body.company_name, req.body.pro_title, req.body.pro_location, req.body.pro_description, req.body.start_date, req.body.end_date], function () {
    res.redirect('/preferences/' + true);
  });
});

// accesses the update function in endeavor.js
// passes endeavor id
// redirects to .get /preferences with a value of true and shows success modal
router.put('/professional/update/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);
  endeavor.updateString(['resume'], { company: req.body.up_proName, position: req.body.up_proTitle, location: req.body.up_proLocation, description: req.body.up_proDescription, startdate: req.body.up_startdate, enddate: req.body.up_enddate }, condition, function () {
    res.redirect('/preferences/' + true);
  });
});

// accesses the update function in endeavor.js
// passes user id
// redirects to .get /preferences with a value of true and shows success modal
router.put('/professional/update/logo/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);
  endeavor.update(['resume'], { hasimage: req.body.has_image }, condition, function () {
    endeavor.updateString(['resume'], { image: req.body.pro_image}, condition, function () {
      res.redirect('/preferences/' + true);
    });    
  });
});

// accesses the update function in endeavor.js
// passes endeavor id
// redirects to .get /preferences with a value of true and shows success modal
router.put('/preferences/update/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);
  endeavor.updateString(['user'], { firstName: req.body.first_name, lastName: req.body.last_name, email: req.body.email_address, phoneNumber1: req.body.phone, address: req.body.address, city: req.body.city, state: req.body.state, zip: req.body.zip }, condition, function () {
    res.redirect('/preferences/' + true);
  });
});

// accesses the update function in endeavor.js
// passes user id
// redirects to .get /preferences with a value of true and shows success modal
router.put('/preferences/update/avatar/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);
  endeavor.update(['user'], { hasavatar: req.body.has_avatar }, condition, function () {
    endeavor.updateString(['user'], { avatar: req.body.profile_avatar}, condition, function () {
      res.redirect('/preferences/' + true);
    });    
  });
});

// accesses the update function in endeavor.js
// passes user id
// redirects to .get /preferences with a value of true and shows success modal
router.put('/preferences/update/name/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);
  //endeavor.update(['user'], { hasavatar: req.body.has_avatar }, condition, function () {
    endeavor.updateString(['user'], { displayName: req.body.profile_name, displaySentence: req.body.profile_sentence}, condition, function () {
      res.redirect('/preferences/' + true);
    });    
  //});
});

// accesses the update function in endeavor.js
// passes user id
// redirects to .get /preferences with a value of true and shows success modal
router.put('/preferences/update/background/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);
  endeavor.update(['user'], { hasbackground: req.body.has_background }, condition, function () {
    endeavor.updateString(['user'], { background: req.body.profile_background}, condition, function () {
      res.redirect('/preferences/' + true);
    });    
  });
});

// accesses the update function in endeavor.js
// passes user id
// redirects to .get /preferences with a value of true and shows success modal
router.put('/preferences/update/summary/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);
  //endeavor.update(['user'], { hasavatar: req.body.has_avatar }, condition, function () {
    endeavor.updateString(['user'], { summary: req.body.profile_summary}, condition, function () {
      res.redirect('/preferences/' + true);
    });    
  //});
});

// accesses the create and update function in endeavor.js
// passes the values from the job.handlebars form and passes the db column name
// redirects to .get /profile
router.put('/job/complete/:jobID/:employerID/:employeeID', function (req, res) {
  endeavor.create(['feedback'], ['rating', 'jobID', 'employerID', 'employeeID', 'review', 'title'], [req.body.job_rated, req.params.jobID, req.params.employerID, req.params.employeeID, req.body.job_review, req.body.job_compTitle], function () {
    var condition = 'jobID = ' + req.params.jobID;
    var typeReview = '6';
    endeavor.update(['jobs'], { completed: req.body.job_complete }, condition, function () {
      endeavor.create(['notifications'], ['jobID', 'employerID', 'employeeID', 'notification', 'type'], [req.params.jobID, req.params.employerID, req.params.employeeID, req.body.note_ReviewMessage, typeReview], function () {
        res.redirect('/profile');
      });
    });
  });
});

// accesses the update function in endeavor.js
// passes the values from the job.handlebars form and passes the db column name
// redirects to .get /profile
router.put('/job/complete/noReview/:jobID', function (req, res) {
  var condition = 'jobID = ' + req.params.jobID;
  endeavor.update(['jobs'], { completed: req.body.job_complete }, condition, function () {
    res.redirect('/profile');
  });
});

// ajax request
// sends all of the user's notifications
// employeeID should work for all messages because of the way they are inserted
router.get('/notifications/:id/:user', isLoggedIn, function(req, res) {
  var condition = 'employeeID = ' + req.params.id;
  var condition1 = 'receiver = "' + req.params.user +'"';
  var condition2 = 'parent = "x"';
  var condition3 = 'rdelete = "0"';
  var condition4 = 'sender = "' + req.params.user +'"';
  var condition5 = 'sdelete = "0"';
  var condition6 = 'parent = "x"';
  var condition7 = 'hasreplies = "1"';
  var condition8 = 'senttime';
  endeavor.allWhere('notifications', condition, function (notifications) {
    endeavor.allParentPm('pm', condition1, condition2, condition3, condition4, condition5, condition6, condition7, condition8, function (pms) {
      res.render('notifications', {
        user: req.user,
        notifications: notifications,
        pms: pms
      });
      console.log('Private Messages', pms);
    });
  });
});

// ajax request
// sends all of the user's notifications
router.get('/ajax/notifications/:id', function(req, res) {
  var condition = 'employeeID = ' + req.params.id;
  endeavor.allWhere('notifications', condition, function (notifications) {
    res.send(notifications);
  });
});

// ajax request
// Deletes a notification where notificationID = id
router.delete('/delete/note/:id', function(req, res) {
  var condition = 'notificationID = ' + req.params.id; 
  endeavor.delete('notifications', condition, function (deleted) {
    res.send(deleted);
  });
});

// ajax request
// all the available subCategories posted on the site
router.get('/ajax/subCategory/:id', function(req, res) {
  var condition = 'categoryID = ' + req.params.id; 
  endeavor.allWhere('subCategory', condition, function (subCategories) {
    res.send(subCategories);
  });
});

// =====================================
// SEND PRIVATE MESSAGE =========================
// =====================================
// redirects to profile-public and opens pm form
// we will want this protected so you have to be logged in to use
// we will use route middleware to verify this (the isLoggedIn2 function)
router.get('/new/message/:id/:user', isLoggedIn2, function(req, res) {
  res.redirect('/public/profile/' + req.params.user + '/' + true);
});

// redirects to profile-public and opens pm form
// we will want this protected so you have to be logged in to use
// we will use route middleware to verify this (the isLoggedIn2 function)
router.post('/send/new/message', isLoggedIn2, function(req, res) {
  endeavor.create(['pm'], ['receiver', 'sender', 'subject', 'message', 'parent'], [req.body.pm_receiver, req.body.pm_sender, req.body.pm_subject, req.body.pm_message, req.body.parent], function () {
    res.redirect('/public/profile/' + req.body.owner + '/' + true);
  });
});

// we will want this protected so you have to be logged in to use
// we will use route middleware to verify this (the isLoggedIn2 function)
router.post('/send/reply/message', isLoggedIn2, function(req, res) {
  var condition = 'id = ' + req.body.parent;
  endeavor.create(['pm'], ['receiver', 'sender', 'subject', 'message', 'parent'], [req.body.pm_receiver, req.body.pm_sender, req.body.pm_subject, req.body.pm_message, req.body.parent], function () {
    if(req.body.pm_sender == req.body.orig_sender){
      var hasreplies = '1';
      var rread = '0';
      var sread = '1';
    }else{
      var hasreplies = '1';
      var rread = '1';
      var sread = '0';   
    }
    endeavor.updateString(['pm'], { hasreplies: hasreplies, rread: rread, sread: sread}, condition, function () {
    res.redirect('back');
    });
  });
});

// AJAX request
// Sends all of the parent pm's replies
router.get('/private/message/replies/:id', isLoggedIn, function(req, res) {
  var condition1 = 'parent = ' + req.params.id;
  var condition2 = "senttime"; 
  endeavor.manyWhereAsc(['sender', 'message', 'senttime', 'parent'], 'pm', condition1, condition2, function (replies) {
    res.send(replies);
  });
});

// accesses the update function in endeavor.js
// passes the values from the notification.handlebars form and passes the db column name
// redirects to notifications
router.put('/message/delete/:pmID/:senderID/:user', function (req, res) {
  var condition = 'id = ' + req.params.pmID;
  var sDelete = '1';
  var rDelete = '1';
  if(req.params.senderID == req.params.user){
    endeavor.update(['pm'], { sdelete: sDelete }, condition, function () {
      res.redirect('back');
    });
  }else{
    endeavor.update(['pm'], { rdelete: rDelete }, condition, function () {
      res.redirect('back');
    });
  } 
});

// accesses the update function in endeavor.js
// passes the values from the notification.handlebars form and passes the db column name
// redirects to notifications
router.put('/message/read/:pmID/:senderID/:user', function (req, res) {
  var condition = 'id = ' + req.params.pmID;
  var sRead = '1';
  var rRead = '1';
  if(req.params.senderID == req.params.user){
    endeavor.update(['pm'], { sread: sRead }, condition, function (success) {
      res.send(success)
    });
  }else{
    endeavor.update(['pm'], { rread: rRead }, condition, function (success) {
      res.send(success);
    });
  } 
});
// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

// route middleware to make sure
function isLoggedIn2(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the login page
  res.redirect('/login/stay/' + req.params.id +'/'+ req.params.user);
}

// checks to see if page viewer is page owner
function isOwner(req, loggedin, owned) {

  console.log(req, loggedin);
  if (req == loggedin) {
    var owner = true;
    console.log(owner);
    owned(owner);

  }
  else {
    var owner = false;
    console.log(owner);
    owned(owner);
  }

}

// route middleware to make sure
function getUrlData(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.params.id && req.params.user != undefined){
    var jobID = req.params.id;
    var userID = req.params.user;
    return next(jobID, userID);
  }else{
    // if they aren't redirect them to the login page
    res.redirect('/login');
  }

}

module.exports = router;