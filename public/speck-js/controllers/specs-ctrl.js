angular.module('Speck').controller('SpecsCtrl', ['$scope', '$rootScope', '$http', '$stateParams', SpecsCtrl]);

function SpecsCtrl($scope, $rootScope, $http, $stateParams) {
    $scope.specs = [];
    $scope.initSpecs = function() {
        $scope.updateUserSpecs();
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
        });
    }
    $scope.initMultiDropzone = function() {
        $scope.multidropzone = new Dropzone("div#multidropzone", {
            url: "/specs/post",
            acceptedFiles: ".docx"
        });
        $scope.multidropzone.on("sending", function(file, xhr, formdata) {
            formdata.append("email", "nirav.shah83@gmail.com")
        });
		$scope.multidropzone.on("success", function(xhr, resp) {
            $scope.updateUserSpecs();
        });
    }
    $scope.updateUserSpecs = function() {
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
    }
}