var Spec = require('../node_models/spec-model');
var shortid = require('shortid');
var mammoth = require("mammoth");
module.exports = function(app, passport) {
    app.post('/api/spec/incoming', function(req, res) {
        var events = JSON.parse(req.body.mandrill_events);
        events.forEach(function(ev) {
            console.log("incoming", ev.event, ev.msg.from_email);
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
}