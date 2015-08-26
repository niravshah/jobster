angular.module('Speck').controller('ListsCtrl', ['$scope', '$rootScope', '$http', '$log', 'AuthService', ListsCtrl]);

function ListsCtrl($scope, $rootScope, $http, $log, aS) {
  $scope.userLists
  $scope.initLists = function() {
    console.log('initLists');
    $http({
      url: '/api/lists',
      method: 'GET',
      params: {
      'email': aS.userEmail()
      }
    }).success(function(data, status, headers, config) {        
      console.log('User Lists: ', data);    
      $scope.userLists = data;
    });   
  }
}