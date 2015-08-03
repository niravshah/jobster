angular.module('Speck').controller('DashboardCtrl', ['$scope', '$state', '$location', 'DataService', DashboardCtrl]);

function DashboardCtrl($scope, $state, $location, dS) {
    $scope.selectedIndex = 0;
    $scope.initDashboard = function() {
        console.log('Dash Board Ctrl Init', $location.path());
        var path = $location.path();
        if(path.indexOf('invites') > 0) {
            $scope.selectedIndex = 1;
        }
        dS.updateUserSpecs();
        //dS.updateUserSpecInvites();
    }
    $scope.tabSelected = function(idx) {
        if(idx == 'specs') {
            $scope.currLiveDelta = 0;
            $state.go('v2.specs');
        } else if(idx == 'invites') {
            $state.go('v2.invites');
        }
    }
}