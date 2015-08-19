angular.module('Speck').controller('PipelineCtrl', ['$scope', '$http', 'filterFilter', PipelineCtrl]);

function PipelineCtrl($scope, $http, filterFilter) {
  $scope.selected = [];
  $scope.filters = {
    'career': true,
    'culture': true
  }
  $scope.initPipeline = function() {
    console.log('Init Pipeline');
    $scope.megalist = [];
    $http.get('/mock/men_pipeline.json').then(function(res) {
      $scope.megalist = $scope.megalist.concat(res.data);
      $http.get('/mock/women_pipeline.json').then(function(res) {
        $scope.megalist = $scope.megalist.concat(res.data);
        for(var it in $scope.megalist) {
          var item = $scope.megalist[it]
          item.spec = []
          for(var sp in item.specs) {
            item.spec.push(item.specs[sp].value)
          }
        }
        $scope.sourced = filterFilter($scope.megalist, {
          status: 'sourced'
        });
        $scope.engaged = filterFilter($scope.megalist, {
          status: 'screened'
        });
        $scope.triggered = filterFilter($scope.megalist, {
          status: 'interested'
        });
      });
    });
  }
  
  $scope.filterFunction = function(searchText) {    
    if(searchText != undefined){
    return function(item) {      
      for(var sp in item.spec){
        if(item.spec[sp].indexOf(searchText) != -1) return true;
      }
       return false;
      
    }}
  }
}