// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var shortid = require('shortid');
var jwt = require('express-jwt');


var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var multer  = require('multer');
var configDB = require('./node_config/database.js');


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./node_config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.set('jwt-secret','shhhhhhared-secret');
app.use('/api', jwt({ secret: app.get('jwt-secret'),credentialsRequired: true}));
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.send(401, 'invalid token...');
  }
});

app.set('views', __dirname + '/node_views');
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(multer({
  dest: '/home/codio/workspace/specky/tmp',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + '-' + Date.now();
  }
}));


var pp = app.listen(port);

// socket ======================================================================
var io = require('socket.io').listen(pp);
var socketio = require('./node_config/socket.js')(io);

// routes ======================================================================
require('./node_routes/nr-core-routes.v2.js')(app, passport);
require('./node_routes/nr-passport.v2.js')(app, passport); 
require('./node_routes/nr-auth-routes.v2.js')(app); 
require('./node_routes/nr-spec-routes.v2.js')(app, passport); 
require('./node_routes/nr-mandrill-inbound.v2.js')(app, passport); 
require('./node_routes/nr-mandrill-outbound.v2.js'); 
require('./node_routes/nr-glassdoor.v2.js')(app, passport); 
require('./node_routes/nr-invite-routes.v2.js')(app, passport,io); 


console.log('The magic happens on port ' + port);
