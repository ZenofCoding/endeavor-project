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
    res.render('login', { message: req.flash('loginMessage') });
  });

  // process the login form
  router.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
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
      // var hbsObject = { endeavors: data, user : req.user };
      // console.log(hbsObject);
      res.render('profile', {
        user: req.user, 
        jobs: jobs
      });
      console.log(jobs);
    });
    console.log(req.user);
  });
  // =====================================
  // PREFERENCES SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  router.get('/preferences', isLoggedIn, function(req, res) {
    var condition = 'userID = ' + req.user.id;
    endeavor.allWhere('jobs', condition, function (jobs) {
      // var hbsObject = { endeavors: data, user : req.user };
      // console.log(hbsObject);
      res.render('preferences', {
        user: req.user, 
        jobs: jobs
      });
      console.log(jobs);
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
      console.log(jobs);
    });
    console.log(req.user);
  });
  // =====================================
  // JobSearch SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  router.get('/jobsearch', function(req, res) {
    // res.render('profile', {
    //   user : req.user // get the user out of session and pass to template
    // });
    //var userObject = { user : req.user };
    var condition = '';//'userID = ' + req.user.id;
    endeavor.all('jobs', function (jobs) {
      // var hbsObject = { endeavors: data, user : req.user };
      // console.log(hbsObject);
      res.render('jobsearch', {
        user: req.user,
        jobs: jobs
      });
      console.log(jobs);
    });
    
  });


router.get('/jobCategory/:id', function(req, res) {
    // res.render('profile', {
    //   user : req.user // get the user out of session and pass to template
    // });
    //var userObject = { user : req.user };

  var condition = 'category = "' + req.params.id +'"';
    endeavor.allWhere('jobs', condition, function (jobs) {
      // var hbsObject = { endeavors: data, user : req.user };
      // console.log(hbsObject);
      res.render('jobsearch', {
        user: req.user,
        jobs: jobs
      });
      console.log(jobs);
    });
    console.log(req.user);
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
  endeavor.create(['jobs'], ['title', 'description', 'userID', 'image', 'category', 'subcategory', 'bidding', 'jobstart', 'deadline', 'firmness', 'budget'], [req.body.job_title, req.body.job_description, req.body.user_id, req.body.image1, req.body.category, req.body.subcategory, req.body.bidding, req.body.start, req.body.end, req.body.firm, req.body.budget], function () {
    res.redirect('/profile');
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

module.exports = router;