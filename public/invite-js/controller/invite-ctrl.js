/**
 * Spec Controller
 */
angular.module('specky-invite').controller('InviteCtrl', ['$scope', '$http', '$stateParams', InviteCtrl]);
angular.module('specky-invite').controller('SideBarCtrl', ['$scope', '$http', '$stateParams', '$window', '$document', SideBarCtrl]);

function InviteCtrl($scope, $http, $stateParams) {
    $scope.data = {};
    $scope.getInvite = function() {
        $http.get('/api/invite/' + $scope.code).success(function(data, status, headers, config) {
            //console.log(data.spec)
            $scope.data = data;
        }).
        error(function(data, status, headers, config) {
            console.log('Error', data);
        });
    }
}

function SideBarCtrl($scope, $http, $stateParams, $window, $document) {
    $scope.checked = false; // This will be binded using the ps-open attribute
    $scope.toggle = function() {
        $scope.checked = !$scope.checked
    }
    angular.element($window).bind("scroll", function() {
        console.log('Angular Scroll', $window.scrollY, $document.height());
        /*if($window.scrollY > $document.height() - 500) {
            $scope.checked = true;
            $scope.$apply();
        }*/
		
		if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
            console.log('Reached Bottom!', $(window).scrollTop());
            $scope.checked = !$scope.checked;
			$scope.$apply();
        }
    });
    /*$(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            console.log('Reached Bottom!', $(window).scrollTop());
            $scope.checked = !$scope.checked;
			$scope.$apply();
        }
    });*/
}