/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var endeavor = require('../models/endeavor.js');

// redirects user to /burgers
router.get('/', function (req, res) {
  res.redirect('/endeavors');
});

// accesses the all function in endeavor.js
// tells the index.handlebars to render and sends select all response as an object
router.get('/endeavors', function (req, res) {
  endeavor.all(function (data) {
    var hbsObject = { endeavors: data };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

// accesses the create function in endeavor.js
// passes the values from the index.handlebars form and passes the db column name
// redirects to .get /endeavors and reloads page
router.post('/endeavors/create', function (req, res) {
  endeavor.create(['endeavor column name goes here'], [req.body.form input name goes here], function () {
    res.redirect('/endeavors');
  });
});

// accesses the update function in endeavor.js
// passes endeavor id and hidden input value from form in index.handlebars
// redirects to .get /endeavors and reloads page
router.put('/endeavors/update/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;
  console.log('condition', condition);
  endeavor.update({ devoured: req.body.devoured }, condition, function () {
    res.redirect('/endeavors');
  });
});

module.exports = router;