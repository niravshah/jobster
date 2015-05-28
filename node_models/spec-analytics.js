// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var specAnalytics = mongoose.Schema({
 invite:String,
 analytics:[],
	sid: String
});

// create the model for Spec and expose it to our app
module.exports = mongoose.model('SpecAnalytics', specAnalytics);