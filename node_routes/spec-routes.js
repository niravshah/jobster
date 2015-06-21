var Spec = require('../node_models/spec-model');
var shortid = require('shortid');
var supagent = require('superagent');
var mammoth = require("mammoth");
module.exports = function(app, passport) {
   
    app.post('/new-spec', passport.authenticate('local-login', {
        failureRedirect: '/login'
    }), function(req, res) {
        if((typeof req.body.specid == 'undefined')) {
            var newSpec = new Spec();
            newSpec.email = req.body.email;
            newSpec.spec = req.body.content;
            newSpec.sid = shortid.generate();
            newSpec.save(function(err) {
                if(err) res.json(err);
                res.json(newSpec);
            })
        } else {
            res.send('OK');
        }
    });
   
   
 
    app.post('/spec/:specId/send', function(req, res) {
        Spec.findOne({
            'sid': req.param('specId')
        }, function(err, spec) {
            if(err) res.send('Error');
            if(spec) {
                if(typeof spec.invites == 'undefined') {
                    spec.invites = []
                }
                req.body.details['code'] = shortid.generate();
                spec.invites.push(req.body.details);
                spec.save(function(err) {
                    if(err) res.json(err);
                    res.json(spec);
                });
                res.send(spec);
            }
        });
    });
}