var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var moment = require('moment');

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
  extended: false
}));
//added from demo
app.use(bodyParser.json());
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        trimString: function(passedString) {
            var str = passedString.substring(0,725);
            str = (str.slice(0,-3) + '. . .');
            return str
        },
        prettifyDate: function(timestamp) {
            // return new Date(timestamp).toString('yyyy-MM-dd')
            return moment(timestamp).format('MMMM Do YYYY');
        },
        starRating: function(rating) {
            switch (rating) {
              case 1:
                  rated = "/assets/images/stars_1.png";
                  break;
              case 2:
                  rated = "/assets/images/stars_2.png";
                  break;
              case 3:
                  rated = "/assets/images/stars_3.png";
                  break;
              case 4:
                  rated = "/assets/images/stars_4.png";
                  break;
              case 5:
                  rated = "/assets/images/stars_5.png";
          }
            return rated.toString();
        }
        // bar: function () { return 'BAR!'; }
    }
});
app.engine('handlebars', hbs.engine, exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// required for passport
app.use(session({
  secret: 'vidyapathaisalwaysrunning',
  resave: true,
  saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes requests to endeavor_controller.js
var routes = require('./controllers/endeavor_controller.js');
app.use('/', routes);

var port = process.env.PORT || 8080;
app.listen(port);