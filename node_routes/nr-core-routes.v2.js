var supagent = require('superagent');
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
  var listUrl = "https://us3.api.mailchimp.com/3.0/lists/9e67587f52/members/";
  var data = {}
  data['email_address'] = req.body.email_address;
  data['status'] = "subscribed";
  data['merge_fields'] = {}
  data['merge_fields']['FNAME'] = req.body.name;
  supagent.post(listUrl).auth('specky','fbaf6ff5da88664241e345550b7ab926-us3').send(data).end(function(err, res) {
   if(res.ok) {
    console.log('Got OK from MailChimp', JSON.stringify(res.body));
   } else {
    console.log('Not OK from MailChimp', res.text);
   }
  })
 });
}