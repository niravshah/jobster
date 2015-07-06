var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var invite = mongoose.Schema({
    code: String,
    email: String,
    name: String,
    sid: {
        type: Schema.Types.ObjectId,
        ref: 'Spec'
    },
    analytics: [{
        type: Schema.Types.ObjectId,
        ref: 'SpecAnalytics'
    }],
    uid: String
});

module.exports = mongoose.model('Invite', invite);