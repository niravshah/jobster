angular.module('Speck').controller('PipelineCtrl', ['$scope', '$http', 'filterFilter', 'ngBooleanSearch',PipelineCtrl]);
angular.module('Speck').filter('pipelineFilter', function() {
  return function(input, searchText) {
    if(typeof searchText != 'undefined') {
      var out = []
      var searchTextLower = searchText.toLowerCase();
      angular.forEach(input, function(ip, searchText) {
        if(ip.text.indexOf(searchTextLower) != -1) {
          out.push(ip);
        }
      });
      //console.log('pipelineFilter', searchText, input.length, out.length);
      return out;
    }
    return input;
  }
});
angular.module('Speck').filter('aspirationFilter',['ngBooleanSearch', function(ngBooleanSearch) {
  return function(input, filters) {
    if(typeof input != 'undefined') {
      
      var srchTxt = 'aspirations: '
      if(filters['anyAll'] == 'any'){
        if(filters['career'] == true){
          srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('career') : srchTxt = srchTxt.concat(' OR career');
        }
        if(filters['compensation'] == true){
          srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('compensation') : srchTxt = srchTxt.concat(' OR compensation');
        }
        if(filters['challenge'] == true){
          srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('compensation') : srchTxt = srchTxt.concat(' OR compensation');
        }
        if(filters['culture'] == true){
          srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('culture') : srchTxt = srchTxt.concat(' OR culture');
        }
      }else{       
        if(filters['career'] == true){
          srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('career') : srchTxt = srchTxt.concat(' AND career');
        }
        if(filters['compensation'] == true){
          srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('comp') : srchTxt = srchTxt.concat(' AND comp');
        }
        if(filters['challenge'] == true){
          srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('challenge') : srchTxt = srchTxt.concat(' AND challenge');
        }
        if(filters['culture'] == true){
          srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('culture') : srchTxt = srchTxt.concat(' AND culture');
        }       
      }
      
      var out = []
      angular.forEach(input,function(ip){
        if(ngBooleanSearch.filterBookmark(ip,srchTxt) == true){
            out.push(ip)
        }
      });
      return out;
      
      //console.log('aspirationFilter', input, filters, srchTxt);
      
    }
    return input;
  }
}]);



function PipelineCtrl($scope, $http, filterFilter,ngBooleanSearch) {
  $scope.selected = [];
  $scope.filters = {
    'career': true,
    'culture': true,
    'compensation': true,
    'challenge': true,
    'anyAll':'all'
  }
  
  $scope.filterChange = function(){
    console.log('filterChange: ', $scope.filters);
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
            item.spec.push(item.specs[sp].text);
          }
          item.asp = [];
          for(var sp in item.aspirations){
            item.asp.push(item.aspirations[sp].text);
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
        
        
        /*var srchTxt = 'tag: tag1 OR tag2';
        var bookmark = {
          title: 'title',
          url: 'http://127:0:0:1',
          tag:[{text: 'tag1'}, {text: 'tag2'}, {text: 'tag3'}]
        };*/
        
        var srchTxt = 'aspirations: comp OR culture';
        var bookmark = {"id":2,"first_name":"Paul","last_name":"Reynolds","email":"preynolds1@dot.gov","sex":"men","imgNum":61,"status":"interested","aspirations":[{"text":"comp"}],"specs":[{"text":"Senior Java Developer"}]}
        
        console.log('ngBooleanSearch', ngBooleanSearch.filterBookmark(bookmark,srchTxt));        
        
        
      });
    });
  }
}