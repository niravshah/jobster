angular.module('Speck').controller('LoginCtrl', ['$scope', '$mdDialog', '$http', LoginCtrl]);

function LoginCtrl($scope, $mdDialog, $http) {
    $scope.answer = function(token) {
        $mdDialog.hide(token);
    };
    $scope.login = function() {
        $http.post('/login-auth', $scope.ddata).success(function(data) {
            console.log(data);
        });
    }
    
     $scope.register = function() {
        $http.post('/register-auth', $scope.ddata).success(function(data) {
            console.log(data);
            $scope.answer(data.token);
        });
    }
}