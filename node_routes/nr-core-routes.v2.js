module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        //res.render('main.ejs');
        res.render('speck2.ejs');
    });
    app.get('/v2*', function(req, res) {
        res.render('speck2.ejs');
    });
    app.get('/invite*', function(req, res) {
        res.render('invite2.ejs');
    });
   app.post('/specky/register', function(req, res) {
        console.log("Specky Register !! ", req.body.email_address);    
    });
}