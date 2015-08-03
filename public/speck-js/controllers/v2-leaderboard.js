angular.module('Speck').controller('LBoardCtrl', ['$scope', '$http', LBoardCtrl]);

function LBoardCtrl($scope, $http) {
  
  $scope.initLBoard = function(){
    $http.get('/mock/leaders.json').then(function(res) {
      $scope.leaders = res.data;
    });
  }
  
  
}