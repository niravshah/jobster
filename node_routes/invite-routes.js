var Spec = require('../node_models/spec-model');
var SpecAnalytics = require('../node_models/spec-analytics');
var multipart = require('connect-multiparty');
//var multiparty = multipart({uploadDir:'/home/codio/workspace/specky/tmp'});
module.exports = function(app, passport) {
    app.get('/api/invite/:code', function(req, res) {
        Spec.findOne({
            'invites.code': req.param('code')
        }, function(err, spec) {
            if(err) res.send('Error');
            if(spec) res.send(spec);
        })
    });
  
    app.post('/api/invite/:code/resume', function(req, res) {         
		SpecAnalytics.findOne({
            'invite': req.param('code')
        }, function(err, spec) {
            if(err) res.send('Error');
            if(spec == null) {
                spec = new SpecAnalytics();
                spec.invite = req.param('code');
                spec.sid = spec.sid;
            }
            spec.analytics.push({
                timestamp: new Date().toJSON(),
                filename:req.files.file.path,
                event:'resume'
            });
            spec.save(function(err, saved) {
                if(err) console.log('Error Saving Analytics');
                if(saved) console.log('Spec Analysis Saved!');
            });
        });
		res.send('Done!');
    });
	
	
	 app.post('/api/invite/:code/:event', function(req, res) {         
		SpecAnalytics.findOne({
            'invite': req.param('code')
        }, function(err, spec) {
            if(err) res.send('Error');
            if(spec == null) {
                spec = new SpecAnalytics();
                spec.invite = req.param('code');
                spec.sid = spec.sid;
            }
            spec.analytics.push({
                timestamp: new Date().toJSON(),
				event:req.param('event'),
                data:req.body.data                
            });
            spec.save(function(err, saved) {
                if(err) console.log('Error Saving Analytics');
                if(saved) console.log('Spec Analysis Saved!');
            });
        });
		res.send('Done!');
    });
	
	
}