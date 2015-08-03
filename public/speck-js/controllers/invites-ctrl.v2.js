angular.module('Speck').controller('InvitesCtrl', ['$scope', '$rootScope', '$http', '$stateParams', '$q', '$mdDialog', '$state', 'DataService', InvitesCtrl]);

function InvitesCtrl($scope, $rootScope, $http, $stateParams, $q, $mdDialog, $state, dS) {
  $scope.initInvites = function() {
    console.log('Invite Ctrl', $scope.userSpecInvites);
    $scope.states = [{
      value: 0,
      display: 'Design & Development Engineer : BlueRock Solutions'
    }];
    $scope.userState = 0;
    $http.get('/mock/invites.json').then(function(res) {
      $scope.userSpecInvites = res.data;
      $scope.userSpecInvitesCount = res.data.length;
    });
  }
  $scope.filter = {
    options: {
      debounce: 500
    }
  };
  $scope.selected = [];
  $scope.query = {
    order: 'cname',
    limit: 10,
    page: 1
  };
  $scope.removeFilter = function() {
    $scope.filter.show = false;
    $scope.filter.value = undefined;
    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  }
  $scope.filterItems = function(filter) {
    console.log('filterItems ', filter);
  }
  $scope.skip = function(dessert, index) {
    return index >= ($scope.query.limit * ($scope.query.page - 1));
  };
}