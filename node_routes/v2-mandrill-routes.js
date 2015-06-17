var Spec = require('../node_models/spec-model');
var shortid = require('shortid');
var supagent = require('superagent');
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
                        var html = result.value;
                        //var messages = result.messages;
                        //console.log(messages);
                        var newSpec = new Spec();
                        newSpec.email = ev.msg.from_email;
                        newSpec.spec = html;
                        newSpec.sid = shortid.generate();
                        newSpec.status = 'draft';
                        newSpec.save(function(err) {
                            console.log('Done', err)
                        })
                    }).done();
                }
            })
        });
        res.status(200).send('OK');
    });
}