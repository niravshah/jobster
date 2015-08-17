angular.module('Speck').controller('PipelineCtrl', ['$scope', '$http', 'filterFilter', PipelineCtrl]);

function PipelineCtrl($scope, $http, filterFilter) {
  $scope.selected = [];
  $scope.initPipeline = function() {
    console.log('Init Pipeline');
    $scope.megalist = [];
    
    $http.get('/mock/men_pipeline.json').then(function(res) {
      $scope.megalist = $scope.megalist.concat(res.data);
      $http.get('/mock/women_pipeline.json').then(function(res) {
        $scope.megalist = $scope.megalist.concat(res.data);        
        $scope.megalist.sort(function(x, y){ 
          if (x.first_name < y.first_name) {
            return -1;
          }
          if (x.first_name > y.first_name) {
            return 1;
          }
          return 0;
        });
        
        $scope.sourced = filterFilter($scope.megalist, {
          status: 'sourced'
        });
        $scope.engaged = filterFilter($scope.megalist, {
          status: 'engaged'
        });
        $scope.triggered = filterFilter($scope.megalist, {
          status: 'triggered'
        });     
      });
    });
    
    
  }
}