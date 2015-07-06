angular.module('Speck').controller('MasterCtrl', ['$scope', '$rootScope', '$cookieStore', '$mdSidenav', '$log', '$http', 'jwtHelper', '$mdDialog', 'hello', 'AuthService', MasterCtrl]);
angular.module('Speck').controller('LoginCtrl', ['$scope', '$rootScope', '$mdDialog', '$http', LoginCtrl]);

function MasterCtrl($scope, $rootScope, $cookieStore, $mdSidenav, $log, $http, jwtHelper, $mdDialog, hello, aS) {
  
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
        if(!aS.isLoggedInUser()) {
            console.log('User Not Logged In!');
            $scope.initHelloJs();
            if(aS.isNewGuest()) {
                aS.createGuestToken();
            } else {
                aS.setGuestToScope();
            }
        } else {
            console.log('User Logged In!');
            aS.setUserToScope();
            if(!aS.isLinkedInUser()) {
                $scope.initHelloJs();
            }
        }
    }
    $scope.initHelloJs = function() {
        hello.init({
            linkedin: '75lyog427bffea'
        }, {
            scope: ['email', 'basic'],
            redirect_uri: '/redirect.html'
        });
        hello.on('auth.login', function(r) {
            hello('linkedin').api('me').then(function(json) {
                console.log('auth.login', $rootScope.currentUser, $rootScope.currentUserUid, json)
                aS.updateLinkedInUser(json);
            }, function(e) {
                console.log('Error - initHelloJs - hello(linkedin).api(me)', e)
            })
        });
    }
    $scope.loginUser = function() {
        $mdDialog.show({
            controller: LoginCtrl,
            templateUrl: '/speck-templates/v2-login.html',
            parent: angular.element(document.body)
        }).then(function(token) {
            aS.loginUser(token);
        }, function() {
            console.log('You cancelled the dialog.');
        });
    }
}

function LoginCtrl($scope, $rootScope, $mdDialog, $http) {
    $scope.login = function() {
        $http.post('/login-auth', $scope.ddata).success(function(data, status) {
            if(status == 200) {
                $mdDialog.hide(data.token);
            }
        });
    }
    $scope.register = function() {
        $scope.ddata['guest'] = $rootScope.guest;
        $http.post('/register-auth', $scope.ddata).success(function(data, status) {
            if(status == 200) {
                $mdDialog.hide(data.token);
            }
        });
    }
    $scope.cancel = function() {
        $mdDialog.cancel();
    }
}