var Spec = require('../node_models/spec-model');
var SpecAnalytics = require('../node_models/spec-analytics');
var multipart = require('connect-multiparty');
module.exports = function(app, passport, io) {
    app.get('/api/invite/:code', function(req, res) {
        Spec.findOne({
            'invites.code': req.param('code')
        }, function(err, spec) {
            if(err) res.send('Error');
            if(spec) {
                var socketUrl = '/' + req.param('code');
                var nsp = io.of(socketUrl);
                nsp.on('connection', function(socket) {
                    console.log('someone connected to room', nsp.name, socket.id);
                    //nsp.emit('hi', 'everyone!');
                    socket.on('msg:new', function(data) {
                        //console.log('New Message!', data);
                        nsp.emit('msg:broadcast', data);
                    });
                    socket.on('disconnect', function() {
                        console.log('User Disconnected', this.id);
                    });
					
					     socket.on('reconnect', function() {
                        console.log('User Reconnect Request', this.id);
                    });
					
					var uname='';
					var uemail='';
					for(var i in spec.invites){
						if(spec.invites[i]['code'] ==req.param('code') ){
							uname=spec.invites[i]['name'];
							uemail=spec.invites[i]['email']
						}
					}
                    global.onlineUsers.push({
                        nsp: socket.nsp.name,
						spec:spec.sid,
						rec:spec.email,
                        id: socket.id,
						name:uname,
						email:uemail
                    });
                });
                res.send(spec);
            }
        })
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
                event: req.param('event'),
                data: req.body.data
            });
            spec.save(function(err, saved) {
                if(err) console.log('Error Saving Analytics');
                if(saved) console.log('Spec Analysis Saved!');
            });
        });
        res.send('Done!');
    });
}