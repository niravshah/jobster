angular.module('Speck').controller('LoginCtrl', ['$scope','$rootScope','$mdDialog', '$http', LoginCtrl]);

function LoginCtrl($scope,$rootScope, $mdDialog, $http) {
    $scope.login = function() {
        $http.post('/login-auth', $scope.ddata).success(function(data) {
            if(status == 200) {
                $mdDialog.hide(data.token);
            }
        });
    }
    $scope.register = function() {        
        $scope.ddata['guest'] = $scope.getGuest();
        $http.post('/register-auth', $scope.ddata).success(function(data, status) {
            if(status == 200) {
                $mdDialog.hide(data.token);
            }
        });
    }
    $scope.cancel = function() {
        $mdDialog.cancel();
    }
    
    $scope.getGuest = function(){
        return $rootScope.guest;
    }
}