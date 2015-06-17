// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var specSchema = mongoose.Schema({
    email: String,
    spec: Object,
	invites:Object,
	sid: String,
	status:String,
    designation:Object,
    location:Object,
    comments:Object
});

// create the model for Spec and expose it to our app
module.exports = mongoose.model('Spec', specSchema);
