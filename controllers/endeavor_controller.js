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
      res.redirect('/viewJobAction/' + req.body.jobID +'/'+ req.body.userJob);
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
  endeavor.allWhere('jobs', condition, function (jobs) {
    endeavor.all('category', function (category) {
      endeavor.allWhere('resume', condition, function (resumes) {
        // console.log(hbsObject);
        res.render('profile', {
          user: req.user, 
          jobs: jobs,
          category: category,
          resumes: resumes
        });
        
      });
      //console.log(jobs, category);
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
  endeavor.allWhere('jobs', condition, function (job) {
    endeavor.allWhere('user', condition2, function (postUser) {
        if(req.user == undefined){
          res.render('job', {
            user: req.user,
            job: job,
            postUser: postUser
          }); 
        }else{
          endeavor.all('category', function (category) {
            isOwner(req.params.user, req.user.id, function (owned) {
              res.render('job', {
                user: req.user,
                job: job,
                postUser: postUser,
                category: category,
                owned: owned
              });
              console.log(category);
              //console.log(postUser, req.params.user, req.user);
            });
          });
        }     
    });
  });
});

// renders the job that corresponds to the jobID passed in request
// renders page for bidding and applying for jobs
router.get('/viewJobAction/:id/:user', isLoggedIn2, function(req, res) {
var condition = 'jobID = ' + req.params.id;
var condition2 = 'id = ' + req.params.user;
  endeavor.allWhere('jobs', condition, function (job) {
    endeavor.allWhere('user', condition2, function (postUser) {
      endeavor.all('category', function (category) {
        res.render('job-action', {
          user: req.user,
          job: job,
          postUser: postUser,
          category: category
        });
        console.log(category);
        //console.log(postUser, req.params.user, req.user);
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
router.put('/preferences/update/summary/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);
  //endeavor.update(['user'], { hasavatar: req.body.has_avatar }, condition, function () {
    endeavor.updateString(['user'], { summary: req.body.profile_summary}, condition, function () {
      res.redirect('/preferences/' + true);
    });    
  //});
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