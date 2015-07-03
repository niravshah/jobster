var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var specAnalytics = mongoose.Schema({
    invite: { type: Schema.Types.ObjectId, ref: 'Invite' },
    analytics: [],
    sid: String,
    uid: String
});
module.exports = mongoose.model('SpecAnalytics', specAnalytics);