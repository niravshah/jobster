var shortid = require('shortid');
var jwt = require('jsonwebtoken');

module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.render('main.ejs');
    });
    app.get('/speck*', function(req, res) {
        res.render('speck.ejs');
    });
    app.get('/v2*', function(req, res) {
        res.render('speck2.ejs');
    });
    app.get('/invite*', function(req, res) {
        res.render('invite2.ejs');
    });
    app.get('/test', function(req, res) {
        res.render('invite2.ejs');
    });
    app.get('/api/onlineusers', function(req, res) {
        console.log(global.onlineUsers);
        var toSend = []
        for(var i in global.onlineUsers) {
            if(global.onlineUsers[i]['rec'] == req.param('email')) {
                toSend.push(global.onlineUsers[i]);
            }
        }
        res.send(toSend);
    });
    
    app.get('/guest-token',function(req,res){
        var token = jwt.sign({'token':shortid.generate()}, app.get('jwt-secret'));
        res.json({'token':token});
    })
}
