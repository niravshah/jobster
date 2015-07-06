angular.module('RDash').controller('ChatCtrl', ['$scope', '$rootScope', 'SocketService', ChatCtrl]);

function ChatCtrl($scope, $rootScope, SocketService) {
    
	$scope.showBadge = true;
    $scope.showPanel = false;
    $scope.selt = false;
    $scope.online = [];
	$scope.msgs = [];
	
    $scope.sendMessage = function(on) {
        SocketService.send(on);
		on.nspMsgToSend = '';
    }
    $scope.toggleChatPanel = function() {
        $("#rsidebar-wrapper").toggleClass("active");
        $scope.online = $scope.online.concat($rootScope.onlineUsers);
    }
    $scope.connectToChat = function(nsp) {
        console.log('Connect To Chat', nsp);
        SocketService.connect(nsp);
    }
	$scope.$on('updated',function(){
		$scope.msgs = SocketService.getMessage();
		$scope.$apply();
	})
}