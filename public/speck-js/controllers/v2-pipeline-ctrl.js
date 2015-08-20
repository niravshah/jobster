angular.module('Speck').controller('PipelineCtrl', ['$scope', '$http', 'filterFilter', PipelineCtrl]);
angular.module('Speck').filter('pipelineFilter', function() {
  return function(input, searchText) {
    //console.log('pipelineFilter',input, searchText);
    if(typeof searchText != 'undefined') {
      var out = []
      var searchTextLower = searchText.toLowerCase();
      angular.forEach(input, function(ip, searchText) {
        if(ip.text.indexOf(searchTextLower) != -1) {
          out.push(ip);
        }
      });
      console.log('pipelineFilter', searchText, input.length, out.length);
      return out;
    }
    return input;
  }
});

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
          item.text = JSON.stringify(item).toLowerCase();
          item.spec = [];
          for(var sp in item.specs) {
            item.spec.push(item.specs[sp].value);
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
        //console.log(JSON.stringify($scope.triggered));
      });
    });
  }
}