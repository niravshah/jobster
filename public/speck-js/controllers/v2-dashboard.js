angular.module('Speck').controller('DashboardCtrl', ['$scope', '$rootScope', '$http', '$stateParams', '$q', '$mdDialog', '$state', DashboardCtrl]);

function DashboardCtrl($scope, $rootScope, $http, $stateParams, $q, $mdDialog, $state) {
    $scope.initDashboard = function() {
        console.log('Init Dashboard');
    }
    $scope.filter = {
        options: {
            debounce: 500
        }
    };
    $scope.selected = [];
    $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
    };
    $scope.removeFilter = function() {
        $scope.filter.show = false;
        $scope.filter.value = undefined;
        if($scope.filter.form.$dirty) {
            //getDesserts();
            $scope.filter.form.$setPristine();
        }
    }
    $scope.filterItems = function(filter) {
        console.log('filterItems ', filter);
    }
    $http.get('/desserts.js').then(function(desserts) {
        $scope.desserts = desserts.data;
    });
    $scope.skip = function(dessert, index) {
        return index >= ($scope.query.limit * ($scope.query.page - 1));
    };
}