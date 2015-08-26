var List = require('../node_models/list');
var shortid = require('shortid');
module.exports = function(app) {
  
  app.post('/api/list/save', function(req, res) {
    List.newList(new List(), req.body.email, req.body.listName, req.body.listType, req.body.listSummary, req.body.list, shortid.generate(), function(spec) {
      res.send(spec);
    });
  });
  
  app.get('/api/list/:sid', function(req, res) {
    List.find({
      'sid': req.param('sid')
    }).exec(function(err, lists) {
      if(lists) {
        res.status(200).send(lists);
      }
    });
  });
  
  app.get('/api/lists', function(req, res) {    
    List.find({
      'email': req.param('email')
    }).populate('invites').exec(function(err, specs) {
      if(err) res.send('Error');
      if(specs) {
        res.status(200).send(specs);
      }
    });       
  });
  
  
}