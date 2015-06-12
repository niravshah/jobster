angular.module('specky-invite').controller('ChatCtrl', ['$scope', '$http', '$stateParams', '$log', '$window', 'SocketService', ChatCtrl]);

function ChatCtrl($scope, $http, $stateParams, $log, $window, SocketService) {
    $scope.msgToSend = ''
    $scope.showBadge = true;
    $scope.showPanel = false;
    $scope.sendMessage = function() {
		
        var nmp = '/' + $scope.code
        SocketService.send({
            nsp: nmp,
            nspMsgToSend: $scope.msgToSend,
            imgSrc: "http://placehold.it/50/FA6F57/fff&text=ME"
        });
		
		$scope.msgToSend = '';
    };
    $scope.togglePanel = function() {
        $scope.showBadge = !$scope.showBadge;
        $scope.showPanel = !$scope.showPanel;
        var nmp = '/' + $scope.code
        SocketService.connect(nmp);
    };
    $scope.$on('updated', function() {
        var nmp = '/' + $scope.code
        var messg = SocketService.getMessage();
        $scope.msgs = messg[nmp];
        console.log($scope.msgs)
        $scope.$apply();
    })
}