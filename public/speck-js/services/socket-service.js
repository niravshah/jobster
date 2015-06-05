angular.module('RDash').factory('SocketService', ['$rootScope',SocketService]);

function SocketService($rootScope) {
    var url = 'http://truck-aloha.codio.io:8080';
    var sockets = {};
    var nspMsgRecd = {};
    var nspMsgToSend = {};
    return {
        connect: function(nsp) {
            var socket = io(url + nsp, {
                transports: ['polling']
            });
            socket.on('disconnect', function(data) {
                console.log('Disconnected!', data);
                sockets[nsp].disconnect();
            });
            socket.on('connect', function(data) {
                console.log('Connected!', this.id)
            });
            socket.on('msg:broadcast', function(data) {
                console.log('Chat Recieved!', data);
                if(typeof nspMsgRecd[nsp] == 'undefined') {
                    nspMsgRecd[nsp] = [];
                }
                if(!(data.from == this.id)) {
                    nspMsgRecd[nsp].push({
                        src: 'other',
                        fromName: data.fromName,
                        time: '12 mins ago',
                        message: data.msg
                    });
                } else {
                    nspMsgRecd[nsp].push({
                        src: 'self',
                        fromName: data.fromName,
                        time: '12 mins ago',
                        message: data.msg
                    });
                }
				$rootScope.$broadcast('updated');
            });
            sockets[nsp] = socket;
        },
        send: function(on) {
            var soc = sockets[on.nsp];
            soc.emit('msg:new', {
                from: soc.id,
                msg: on.nspMsgToSend,
                fromName: 'Nirav Shah'
            });
        },
        getMessage: function() {
            return nspMsgRecd;
        }
    }
}