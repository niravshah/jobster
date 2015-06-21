var Spec = require('../node_models/spec-model');
var shortid = require('shortid');
var supagent = require('superagent');
var mammoth = require("mammoth");
module.exports = function(app, passport) {
    app.get('/api/v2/companydetails', function(req, res) {
        supagent.get('http://api.glassdoor.com/api/api.htm').query({
            't.p': '37059'
        }).query({
            't.k': 'emO6bwRqU9u'
        }).query({
            'format': 'json'
        }).query({
            'v': 1
        }).query({
            'action': 'employers'
        }).query({
            'q': req.param('q')
        }).query({
            'userip': '172.17.42.1'
        }).query({
            'useragent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36'
        }).end(function(err, resp) {
            res.send(resp.text);
        });
    });
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
        }, function(err, specs) {
            if(err) res.send('Error');
            if(specs) res.send(specs);
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
}