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
}