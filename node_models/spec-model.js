// load the things we need
var mongoose = require('mongoose');
// define the schema for our user model
var specSchema = mongoose.Schema({
    email: String,
    spec: Object,
    invites: Object,
    sid: String,
    status: String,
    designation: Object,
    location: Object,
    comments: Object
});
specSchema.statics.newSpec = function newSpec(spec, email, content, sid, status, cls) {
    spec.email = email;
    spec.spec = content;
    spec.sid = sid;
    spec.status = status;
    spec.save(cls(spec));
}
specSchema.statics.saveSpec = function saveSpec(spec,speck,status, location, lat, lng, comp, companyName, ct, role,cls) {
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
        location:location
    };
    spec.save(cls(spec));
}
module.exports = mongoose.model('Spec', specSchema);