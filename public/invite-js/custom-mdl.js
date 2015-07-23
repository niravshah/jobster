$(document).ready(function() {
 var options = {
  offset: 150,
  classes: {
   clone: 'fixmenu-clone',
   stick: 'fixmenu-stick',
   unstick: 'fixmenu-unstick'
  },
  onInit: function() {
   console.log('Headhesive Init!');
  },
  onStick: function() {
   console.log('Headhesive Stick!');
  },
  onUnstick: function() {
   console.log('Headhesive Unstick!');
  },
  onDestroy: function() {}
 }
 //var header = new Headhesive('#sticky', options);
});