var Spec = require('../node_models/spec-model');
var email = require('powerdrill')('idr8ixshhI86ju9YSTxTfA');
module.exports = {
    sendSpecky1: function(toEmail, fName, fromEmail, rName, rBio, sid, role, company, location,inviteId, userId, specId) {
        var message = email('specky-1');
        var subject = role + "-" + company;
        var toField = fName + '<' + toEmail + '>';
        var fromField = rName + '<' + fromEmail + '>';
        var mergeVars = {};
        mergeVars['FNAME'] = fName;
        mergeVars['RNAME'] = rName;
        mergeVars['RBIO'] = rBio;
        mergeVars['ROLE'] = role;
        mergeVars['COMPANY'] = company;
        mergeVars['LOCATION'] = location;
        mergeVars['INVITE_URL'] = "http://specky.co/invite/" + inviteId;
        message.subject(subject).to(toField, mergeVars).from(fromField).trackClicks(true).trackOpens(true).metadata('invite', inviteId).metadata('user',userId).metadata('spec',specId).send(function(err, resp) {
            console.log(err, resp);            
        });
    },
    sendSpecky2: function() {}
}   