angular.module('RDash').controller('SpecsCtrl', ['$scope','$rootScope', '$http', '$stateParams', SpecsCtrl]);

function SpecsCtrl($scope,$rootScope, $http, $stateParams) {
    $scope.specs = [];
    $scope.initSpecs = function() {
        $http({
            url: '/api/user-specs',
            method: 'GET',
            params: {
                'email': 'nirav.shah83@gmail.com'
            }
        }).success(function(data, status, headers, config) {
            console.log('Success', data);
            $scope.specs = $scope.specs.concat(data);
        }).error(function(data, status, headers, config) {
            console.log('Error', data);
        });
        $http({
            url: '/api/onlineusers',
            method: 'GET',
            params: {
                'email': 'nirav.shah83@gmail.com'
            }
        }).success(function(data, status, headers, config) {
			$rootScope.onlineUsers = data;
            console.log('Online Users: ', data);
        }).error(function(data, status, headers, config) {
            console.log('Error: ', data);
        })
    }
}