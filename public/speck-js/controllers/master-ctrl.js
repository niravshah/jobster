/**
 * Master Controller
 */
angular.module('Speck').controller('MasterCtrl', ['$scope', '$cookieStore', '$mdSidenav', '$log', '$localStorage', '$http', 'jwtHelper', '$mdDialog', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $mdSidenav, $log, $localStorage, $http, jwtHelper, $mdDialog) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    $scope.mdIsOpen = false;
    var mobileView = 992;
    $scope.getWidth = function() {
        return window.innerWidth;
    };
    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if(newValue >= mobileView) {
            if(angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = !$cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }
    });
    window.onresize = function() {
        $scope.$apply();
    };
    $scope.toggleSideBar = function() {
        $mdSidenav('left').toggle().then(function() {
            $log.debug("toggle LEFT is done");
        });
    }
    $scope.checkUserLogin = function() {
        if(localStorage.getItem('id_token') == null) {
            console.log('User Not Logged In!');
            if(localStorage.getItem('guest_token') == null) {
                $http.get('/guest-token').success(function(data, status, headers, config) {
                    console.log('Guest', jwtHelper.decodeToken(data.token));
                    localStorage.setItem('guest_token', data.token)
                    $scope.guest = jwtHelper.decodeToken(data.token).user;
                });
            }else{
                $scope.guest = jwtHelper.decodeToken(localStorage.getItem('guest_token')).token;
                console.log('Guest Decoded', $scope.guest);
            }
        } else {}
    }
    
    $scope.loginUser = function(){
        console.log('Login User');
        
         $mdDialog.show({
            controller: LoginCtrl,
            templateUrl: '/speck-templates/v2-login.html',
            parent: angular.element(document.body),
            scope: $scope
        }).then(function(token) {
           
        }, function() {
            console.log('You cancelled the dialog.');
        });
        
    }
}