// load the things we need
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// define the schema for our user model
var specAnalytics = mongoose.Schema({
    invite: String,
    analytics: [],
    sid: { type: Schema.Types.ObjectId, ref: 'Spec' },
    uid: String
});
// create the model for Spec and expose it to our app
module.exports = mongoose.model('SpecAnalytics', specAnalytics);