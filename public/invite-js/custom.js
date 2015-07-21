$(document).ready(function() {
  var options = {
    offset: '#showHere',
    classes: {
      clone: 'fixmenu-clone',
      stick: 'fixmenu-stick',
      unstick: 'fixmenu-unstick'
    },
    onInit: function() {
      console.log('Headhesive Init')
    },
    onStick: function() {      
      console.log('Headhesive Stick')
    },
    onUnstick: function() {
      console.log('Headhesive unStick')
    },
    onDestroy: function() {
      console.log('Headhesive Destroy')
    },
  };

  var fixmenu = new Headhesive('.navbar', options);
  gmapUrl = GMaps.staticMapURL({
    size: [240, 240],   
    lat: 51.514840,   
    lng: -0.099702,
    scale: 1,
    markers: [{
      lat: 51.514840,
      lng: -0.099702
    }]
  });
  $('#gmap').css("background", "url(" + gmapUrl + "),no-repeat");
  $('header').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
    console.log('Header Inview!');
    $('#nav').hide();
  });
  $('#section3').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
    $('#nav').addClass('animated fadeInDown').show();
  });
  /* highlight the top nav as scrolling occurs */
  $('body').scrollspy({
    target: '#nav'
  });
  /* smooth scrolling for scroll to top */
  $('.scroll-top').click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 1000);
  })
  /* smooth scrolling for nav sections */
  $('#nav .navbar-nav li>a').click(function() {
    var link = $(this).attr('href');
    var posi = $(link).offset().top + 20;
    $('body,html').animate({
      scrollTop: posi
    }, 700);
  })
});