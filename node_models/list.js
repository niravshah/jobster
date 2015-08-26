var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var list = mongoose.Schema({    
    email:String,
    name:String,
    type:String,   
    summary:String,
    list:[],
    sid: String
});


list.statics.newList = function newSpec(list, email, name, type, summary, content, sid, cls) {
  list.email = email;
  list.name = name;
  list.type = type;
  list.summary = summary;
  list.list = content;
  list.sid = sid;
  list.save(cls(list));
}

module.exports = mongoose.model('List', list);