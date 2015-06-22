var supagent = require('superagent');
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
}