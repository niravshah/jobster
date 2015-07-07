var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Invite = require('../node_models/invite');
var SpecAnalytics = require('../node_models/spec-analytics');

var specSchema = mongoose.Schema({
    email: String,
    spec: Object,
    invites: [{
        type: Schema.Types.ObjectId,
        ref: 'Invite'
    }],
    sid: String,
    status: String,
    designation: Object,
    location: Object,
    comments: Object,
    chars: Object
});
specSchema.statics.newSpec = function newSpec(spec, email, content, sid, status, cls) {
    spec.email = email;
    spec.spec = content;
    spec.sid = sid;
    spec.status = status;
    spec.save(cls(spec));
}
specSchema.statics.saveSpec = function saveSpec(spec, speck, status, location, lat, lng, comp, companyName, ct, role, selChars, cls) {
    spec.status = status;
    spec.spec = speck;
    spec.designation = {
        comp: comp,
        companyName: companyName,
        ct: ct,
        role: role
    };
    spec.location = {
        lat: lat,
        lng: lng,
        location: location
    };
    spec.chars = selChars;
    spec.save(cls(spec));
}


specSchema.pre('remove', function(next) {
    Invite.remove({sid: this._id}).exec();
    SpecAnalytics.remove({sid: this.sid}).exec();
    next();
});
module.exports = mongoose.model('Spec', specSchema);