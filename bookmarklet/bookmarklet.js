artoo.scrape('#profile', {  
  img:{sel:'.profile-picture img', attr:'src'},
  name:{sel:'span.full-name'},
  title:{sel:'p.title'},
  location:{sel:'span.locality a'},
  industry:{sel:'dd.industry a'},
  current:{sel:'span.new-miniprofile-container strong a'},
  education:{sel:'tr#overview-summary-education a'},
  summary:{sel:'div.summary p.description'}
},function(data){console.log(data)});