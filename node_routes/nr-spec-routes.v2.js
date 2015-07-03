var Spec = require('../node_models/spec-model');
var SpecAnalytics = require('../node_models/spec-analytics');
var Invite = require('../node_models/invite');
var shortid = require('shortid');
var mammoth = require('mammoth');
var async = require('async');
var mandrill = require('../node_routes/nr-mandrill-outbound.v2.js');
module.exports = function(app, passport) {
    app.post('/specs/post', function(req, res) {
        console.log(req.files['file'].path);
        mammoth.convertToHtml({
            path: req.files['file'].path
        }).then(function(result) {
            var html = result.value;
            //var messages = result.messages;
            //console.log(messages);            
            Spec.newSpec(new Spec(), req.body.email, html, shortid.generate(), 'draft', function(spec) {
                res.send(spec);
            });
        }).done();
    });
    app.post('/api/specs/:specId/delete', function(req, res) {
        Spec.findOne({
            'sid': req.param('specId')
        }, function(err, spec) {
            if(err) res.send('Error');
            if(spec) {
                spec.remove();
                res.send('Spec Deleted');
            }
        });
    });
    app.post('/api/specs/:specId/makedraft', function(req, res) {
        Spec.findOne({
            'sid': req.param('specId')
        }, function(err, spec) {
            if(err) res.send('Error');
            if(spec) {
                spec.status = 'draft';
                spec.save();
                res.send('Spec Updated to Draft');
            }
        });
    });
    app.get('/api/specs/:specId', function(req, res) {
        Spec.findOne({
            'sid': req.param('specId')
        }, function(err, spec) {
            if(err) res.send('Error');
            if(spec) res.send(spec);
        });
    });
    app.get('/api/user-specs', function(req, res) {
        Spec.find({
            'email': req.param('email')
        }).populate('invites').exec(function(err, specs) {
            if(err) res.send('Error');
            if(specs) {
                var options = {
                    path: 'invites.analytics',
                    model: 'SpecAnalytics'
                };
                Spec.populate(specs, options, function(err, specys) {
                    res.send(specys);
                });
                //res.send(specs);
            }
        });
    });
   
    app.post('/api/specs/:specId/save', function(req, res) {
        Spec.findOne({
            'sid': req.param('specId')
        }, function(err, spec) {
            if(err) res.send('Error');
            if(spec) {
                Spec.saveSpec(spec, req.body.speck, req.body.status, req.body.location, req.body.lat, req.body.lng, req.body.comp, req.body.company, req.body.ct, req.body.role, function(spec) {
                    res.send('Spec Save', spec);
                });
            }
        });
    });
    app.post('/api/specs/:specId/send', function(req, res) {
        Spec.findOne({
            'sid': req.param('specId')
        }, function(err, spec) {
            if(err) res.send('Error');
            if(spec) {
                var invite = new Invite();
                invite.sid = spec._id;
                invite.uid = req.body.details['uid']
                invite.analytics = [];
                invite.code = shortid.generate();
                invite.name = req.body.details['name']
                invite.email = req.body.details['email'];
                invite.save(function(err) {
                    if(err) res.json(err);
                    spec.invites.push(invite._id);
                    spec.save();
                    mandrill.sendSpecky1(invite.email, invite.name, spec.email, spec.email, spec.email, invite.code, spec.designation.role, spec.designation.companyName, spec.location.location, invite.code, invite.uid, spec.sid);
                    res.json(invite);
                });
            }
        });
    });
}