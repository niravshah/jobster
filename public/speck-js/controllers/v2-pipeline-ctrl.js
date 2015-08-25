angular.module('Speck').controller('PipelineCtrl', ['$scope', '$rootScope', '$http', '$mdSidenav', '$log', '$state', 'filterFilter', 'ngBooleanSearch', 'saveListService', PipelineCtrl]);
angular.module('Speck').controller('SaveListCtrl', ['$scope', '$rootScope', '$http', '$mdSidenav', '$log', '$state', 'saveListService', SaveListCtrl]);

function PipelineCtrl($scope, $rootScope, $http, $mdSidenav, $log, $state, filterFilter, ngBooleanSearch, saveListService) {
  $scope.selected = [];
  $scope.mdIsOpenR = false;
  $scope.filters = {
    'career': true,
    'culture': false,
    'compensation': false,
    'challenge': false,
    'anyAll': 'any'
  }
  $scope.filterChange = function() {
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
          item.aspText = JSON.stringify(item.aspirations).toLowerCase();
          for(var sp in item.aspirations) {
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
      });
    });
  }
  $scope.saveList = function(listName) {
    if(listName == 'sourced') {
      saveListService.setList($scope.sourced);
      saveListService.setListName('Sourced');
    } else if(listName == 'screened') {
      saveListService.setList($scope.engaged);
      saveListService.setListName('Screened');
    } else if(listName == 'interested') {
      saveListService.setList($scope.triggered);
      saveListService.setListName('Interested');
    }
    $state.go('v2.pipeline.save');
  }
}
angular.module('Speck').service('saveListService', function() {
  var listToSave = [];
  var listName;
  var setList = function(list) {
    listToSave = list;
  };
  var getList = function() {
    return listToSave
  };
  var getListName = function() {
    return listName
  };
  var setListName = function(listname) {
    listName = listname;
  };
  return {
    getList: getList,
    setList: setList,
    getListName: getListName,
    setListName: setListName
  }
});

function SaveListCtrl($scope, $rootScope, $http, $mdSidenav, $log, $state, saveListService) {
  $scope.listName = saveListService.getListName();
  $scope.initSaveListCtrl = function() {
    $mdSidenav('right').toggle().then(function() {
      $log.debug('Save List:', saveListService.getList());
    });
    angular.element("<md-backdrop>").bind("click", function() {
      console.log('md backdrop click')
      $state.go('^');
    })
  }
  $scope.toggleSideBarRight = function() {
    $mdSidenav('right').close();
    $state.go('^');
  }
  $scope.$watch(function() {
    return $mdSidenav('right').isOpen();
  }, function(newValue, oldValue) {
    if(newValue == false) {
      $state.go('^');
    }
  });
}
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
      return out;
    }
    return input;
  }
});
angular.module('Speck').filter('aspirationFilter', ['ngBooleanSearch',
  function(ngBooleanSearch) {
    return function(input, filters) {
      if(typeof input != 'undefined') {
        var srchTxt = 'aspirations: '
        if(filters['anyAll'] == 'any') {
          if(filters['career'] == true) {
            srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('career') : srchTxt = srchTxt.concat(' OR career');
          }
          if(filters['compensation'] == true) {
            srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('compensation') : srchTxt = srchTxt.concat(' OR compensation');
          }
          if(filters['challenge'] == true) {
            srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('compensation') : srchTxt = srchTxt.concat(' OR compensation');
          }
          if(filters['culture'] == true) {
            srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('culture') : srchTxt = srchTxt.concat(' OR culture');
          }
        } else {
          if(filters['career'] == true) {
            srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('career') : srchTxt = srchTxt.concat(' AND career');
          }
          if(filters['compensation'] == true) {
            srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('comp') : srchTxt = srchTxt.concat(' AND comp');
          }
          if(filters['challenge'] == true) {
            srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('challenge') : srchTxt = srchTxt.concat(' AND challenge');
          }
          if(filters['culture'] == true) {
            srchTxt == 'aspirations: ' ? srchTxt = srchTxt.concat('culture') : srchTxt = srchTxt.concat(' AND culture');
          }
        }
        var out = []
        angular.forEach(input, function(ip) {
          if(ngBooleanSearch.filterBookmark(ip, srchTxt) == true) {
            out.push(ip)
          }
        });
        return out;
      }
      return input;
    }
  }
]);