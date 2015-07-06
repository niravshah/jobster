var shortid = require('shortid');
var jwt = require('jsonwebtoken');
var User = require('../node_models/user');
var Spec = require('../node_models/spec-model');
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
            if(err) res.status(500).send(err);
            if(user) {
                if(user.validPassword(req.body.pword)) {
                    var token = jwt.sign({
                        'user': user.local.email
                    }, app.get('jwt-secret'));
                    res.status(200).send({
                        'token': token
                    });
                } else {
                    res.status(403).send('Invalid Password');
                }
            } else {
                res.status(403).send('User Not Found');
            }
        })
    });
    app.post('/register-auth', function(req, res) {
        var user = new User();
        user.uid = shortid.generate();
        user.local.email = req.body.uname;
        user.local.password = user.generateHash(req.body.pword);
        user.save(function(err, user) {
            if(err) res.send('Error!', err)
            else {
                console.log(req.body.guest);
                console.log(req.body.uname);
                Spec.update({
                    'email': req.body.guest
                }, {
                    'email': req.body.uname
                }, {
                    multi: true
                }, function(err, num) {
                    console.log('Number of Specs Updated: ', num);
                });
                var token = jwt.sign({
                    'user': user.local.email,
                    'uid': user.uid
                }, app.get('jwt-secret'));
                res.status(200).json({
                    'token': token
                });
            }
        });
    });
    app.post('/update-linkedin', function(req, res) {
        User.findOne({
            'uid': req.body.uid
        }, function(err, user) {
            if(err) res.status(500).send(err);
            if(user) {
                user.linkedin = req.body.linkedin;
                user.save(function(err, user) {
                    var token = jwt.sign({
                        'user': user.local.email,
                        'uid': user.uid,
                        'linkedin':user.linkedin
                    }, app.get('jwt-secret'));
                    res.status(200).json({
                        'token': token
                    });
                })
            }
        });
    });
}