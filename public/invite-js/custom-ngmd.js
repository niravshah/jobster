var app = angular.module('StarterApp', ['ngMaterial']);
app.controller('AppCtrl', ['$scope', '$mdSidenav',
  function($scope, $mdSidenav) {
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
    $scope.onTimeSet = function(newDate, oldDate) {
      console.log(newDate);
      console.log(oldDate);
    };
  }
]);
$(document).ready(function() {
  $('#applyNow').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if(isInView) {
      console.log('Inview: ', visiblePartY);
      if(visiblePartY == 'bottom') {
        $('#applyNow').removeClass('non-sticky').addClass('sticky');
        $('#toolbar').removeClass('hide').addClass('show');
      }
    }
  });
  $('#header').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if(isInView) {
      console.log('Inview #header: ', visiblePartY);
      if(visiblePartY == 'top' || visiblePartY == 'both') {
        $('#applyNow').removeClass('sticky').addClass('non-sticky');
        $('#toolbar').removeClass('show').addClass('hide');
      }
    }
  });
  var url = GMaps.staticMapURL({
    size: [400, 200],
    lat: 51.515241,
    lng: -0.099863,
    markers: [{
      lat: 51.515241,
      lng: -0.099863
    }]
  });
  $('<img/>').attr('src', url).appendTo('#map');
});