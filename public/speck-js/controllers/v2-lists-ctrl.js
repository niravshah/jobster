angular.module('Speck').controller('ListsCtrl', ['$scope', '$rootScope', '$http', '$log', 'AuthService', ListsCtrl]);
angular.module('Speck').controller('ListDetailsCtrl', ['$scope', '$rootScope', '$state','$stateParams','$http', '$log', 'AuthService', ListDetailsCtrl]);

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


function ListDetailsCtrl($scope, $rootScope, $state, $stateParams, $http, $log, aS) {  
  $scope.list = [];
  $scope.initListDetailsCtrl = function(){
    console.log('initListDetailsCtrl')
    var url = '/api/list/' + $stateParams.id  ;
    $http.get(url).then(function(response){
      $scope.list = response.data[0].list;
    })
  }
}