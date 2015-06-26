var Spec = require('../node_models/spec-model');
var SpecAnalytics = require('../node_models/spec-analytics');
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
            var invite = ev.msg.metadata['invite'];
            var uid = ev.msg.metadata['user'];
            var spec = ev.msg.metadata['spec'];
            console.log("Incoming Message Event for: ", invite, uid);
            Spec.findOne({
                'sid': spec
            }, function(err, spec) {
                if(spec) {
                    SpecAnalytics.findOne({
                        'invite': invite
                    }, function(err, spc) {
                        if(err) res.send('Error');
                        if(spc == null) {
                            spc = new SpecAnalytics();
                            spc.invite = invite;
                            spc.uid = uid;
                            spc.sid = spec._id;
                        }
                        spc.analytics.push({
                            timestamp: new Date().toJSON(),
                            event: ev.event,
                            data: ev
                        });
                        spc.save(function(err, saved) {
                            if(err) console.log('Error Saving Analytics');
                            if(saved) console.log('Spec Analysis Saved!');
                        });
                    });
                }
            })
        });
        res.status(200).send('OK');
    });
}