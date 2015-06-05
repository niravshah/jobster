angular.module('specky-invite').controller('ChatCtrl', ['$scope', '$http', '$stateParams', '$log', '$window', ChatCtrl]);

function ChatCtrl($scope, $http, $stateParams, $log, $window) {
    $scope.msgToSend = ''
    $scope.showBadge = true;
    $scope.showPanel = false;
    $scope.sendMessage = function() {
        $scope.soc.emit('msg:new', {
            from: $scope.soc.id,
            msg: $scope.msgToSend,
			fromName:'Jack Sparrow'
        });
    }
    $scope.togglePanel = function() {
        $scope.showBadge = !$scope.showBadge;
        $scope.showPanel = !$scope.showPanel;
        if(typeof $scope.soc == 'undefined') {
            console.log('Initializing Socket!');
            $scope.soc = io('http://truck-aloha.codio.io:8080/' + $scope.code, {
                transports: ['polling']                
            });
            $scope.soc.on('disconnect', function(data) {
                console.log('Disconnected!', data);
                $scope.soc.disconnect();
            });
            $scope.soc.on('connect', function(data) {
                console.log('Connected!', this.id)
            });
            $scope.soc.on('reconnect', function(data) {
                console.log('Reconnected!', data)
            });
            $scope.soc.on('error', function(data) {
                console.log('Error!', data);
                $scope.soc.disconnect();
            });
            $scope.soc.on('msg:broadcast', function(data) {
                console.log('Chat Recieved!', data);
                if(!(data.from == this.id)) {
                    console.log('Recieved from Other!', data.from);
                    $scope.msgs.push({
                        imgSrc: "http://placehold.it/50/55C1E7/fff&text=U",
                        uname: 'Jack Sparrow',
                        time: '12 mins ago',
                        message: data.msg
                    });
                    $scope.$apply();
                } else {
                    console.log('Recieved from Self!');
                }
            });
        }
    }
    $scope.msgs = [{
        imgSrc: "http://placehold.it/50/55C1E7/fff&text=U",
        uname: 'Jack Sparrow',
        time: '12 mins ago',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.'
    }, {
        imgSrc: "http://placehold.it/50/FA6F57/fff&text=ME",
        uname: 'Nirav Shah',
        time: '11 mins ago',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.'
    }]
}