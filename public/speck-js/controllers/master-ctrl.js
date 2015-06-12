/**
 * Master Controller
 */

angular.module('Speck')
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$mdSidenav', '$log',MasterCtrl]);

function MasterCtrl($scope, $cookieStore,$mdSidenav, $log) {
    /**
     * Sidebar Toggle & Cookie Control
     */
	
	$scope.mdIsOpen = false;
	
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    /*$scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };*/

    window.onresize = function() {
        $scope.$apply();
    };
	
	
	$scope.toggleSideBar = function(){
		 $mdSidenav('left').toggle()
        .then(function () {
          $log.debug("toggle LEFT is done");
        });
	}
}