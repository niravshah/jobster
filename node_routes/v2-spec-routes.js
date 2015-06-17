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
            var newSpec = new Spec();
            newSpec.email = req.body.email;
            newSpec.spec = html;
            newSpec.sid = shortid.generate();
			newSpec.status = 'draft';
            newSpec.save(function(err) {
                if(err) res.json(err);
                res.json(newSpec);
            })
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
}