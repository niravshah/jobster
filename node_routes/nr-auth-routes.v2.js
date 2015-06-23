var shortid = require('shortid');
var jwt = require('jsonwebtoken');
var User = require('../node_models/user');
module.exports = function(app) {
    app.get('/guest-token', function(req, res) {
        var token = jwt.sign({
            'user': shortid.generate()
        }, app.get('jwt-secret'));
        res.json({
            'token': token
        });
    });
    app.post('/login-auth', function(req, res) {
        User.findOne({
            'local.email': req.body.uname
        }, function(err, user) {
            console.log(user);
            if(user.validPassword(req.body.pword)) {
                res.send('Valid User!')
            } else {
                res.send('Invalid User')
            }
        })
    });
    app.post('/register-auth', function(req, res) {
        var user = new User();
        user.local.email = req.body.uname;
        user.local.password = user.generateHash(req.body.pword);
        user.save(function(user, err) {
            if(err) res.send('Error!', err)
            else {
                var token = jwt.sign({
                    'user': user.local.email
                }, app.get('jwt-secret'));
                res.json({
                    'token': token
                });
            }
        });
    });
}