angular.module('Speck').controller('InvitesCtrl', ['$scope', '$rootScope', '$http', '$stateParams', '$q', '$mdDialog', '$state', 'DataService', InvitesCtrl]);

function InvitesCtrl($scope, $rootScope, $http, $stateParams, $q, $mdDialog, $state, dS) {
    $scope.initInvites = function() {
        console.log('Invite Ctrl', $scope.userSpecInvites);
    }
    $scope.filter = {
        options: {
            debounce: 500
        }
    };
    $scope.selected = [];
    $scope.query = {
        order: 'spec',
        limit: 5,
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