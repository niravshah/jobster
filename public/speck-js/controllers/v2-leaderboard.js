angular.module('Speck').controller('LBoardCtrl', ['$scope', '$http', LBoardCtrl]);

function LBoardCtrl($scope, $http) {
  
  $scope.initLBoard = function(){
    
    $scope.locations = [{'val':0,'disp':'London'}];
    $scope.currLoc = 0;
    
    $http.get('/mock/leaders.json').then(function(res) {
      $scope.leaders = res.data;
    });
  }
  
  
}