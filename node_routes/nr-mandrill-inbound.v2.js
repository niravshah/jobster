var Spec = require('../node_models/spec-model');
var SpecAnalytics = require('../node_models/spec-analytics');
var Invite = require('../node_models/invite');
var shortid = require('shortid');
var mammoth = require("mammoth");
module.exports = function(app, passport) {
    app.post('/incoming/spec/attachment', function(req, res) {
        var events = JSON.parse(req.body.mandrill_events);
        events.forEach(function(ev) {
            console.log("Incoming Attachment Event ", ev.event, ev.msg.from_email);
            var att = ev.msg.attachments;
            Object.keys(att).forEach(function(key) {
                console.log(key, att[key].type);
                if(att[key].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    mammoth.convertToHtml({
                        buffer: new Buffer(att[key].content, "base64")
                    }).then(function(result) {
                        Spec.newSpec(new Spec(), ev.msg.from_email, result.value, shortid.generate(), 'draft', function(spec) {
                            res.send(spec);
                        });
                    }).done();
                }
            })
        });
        res.status(200).send('OK');
    });
    app.post('/incoming/spec/mandrill-events', function(req, res) {
        var events = JSON.parse(req.body.mandrill_events);
        events.forEach(function(ev) {
            if(typeof ev.msg != 'undefined') {
                var code = ev.msg.metadata['invite'];
                var uid = ev.msg.metadata['user'];
                var sid = ev.msg.metadata['spec'];
                console.log("Incoming Message Event for: ", code, uid, sid);
                Invite.findOne({
                    'code': code
                }, function(err, invite) {
                    if(invite) {
                        var sa = new SpecAnalytics();
                        sa.invite = invite._id;
                        sa.uid = uid;
                        sa.sid = sid;
                        sa.analytics.push({
                            timestamp: new Date().toJSON(),
                            event: ev.event,
                            data: ev
                        });
                        sa.save(function(err, sa) {
                            if(err) {
                                console.log('Error saving SpecAnalytics: ', sa);
                            }
                            if(sa) {
                                invite.analytics.push(sa._id);
                                invite.save();
                                console.log('SpecAnalytics saved: ', sa);
                            }
                        });
                        res.status(200).send('OK');
                    }
                });
            } else {
                var sa = new SpecAnalytics();
                sa.analytics.push({
                    timestamp: new Date().toJSON(),
                    event: ev.event,
                    data: ev
                });
                sa.save();
            }
        });
    });
}