angular.module('RDash').controller('ChatCtrl', ['$scope', '$rootScope', '$http', '$stateParams', '$log', '$window', 'SocketService', ChatCtrl]);

function ChatCtrl($scope, $rootScope, $http, $stateParams, $log, $window, SocketService) {
    
	$scope.showBadge = true;
    $scope.showPanel = false;
    $scope.selt = false;
    $scope.online = [];
	$scope.msgs = [];
	
    $scope.sendMessage = function(on) {
        SocketService.send(on);
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
		console.log('updated event');
		$scope.msgs = SocketService.getMessage();
		console.log($scope.msgs);
		$scope.$apply();
	})
}