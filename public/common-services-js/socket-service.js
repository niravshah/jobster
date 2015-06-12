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
                var from = ''
                if(!(data.from == this.id)) {
                    from = 'other'
                } else {
                    from = 'self'
                }
                nspMsgRecd[nsp].push({
                    src: from,
                    fromName: data.fromName,
                    time: '12 mins ago',
                    message: data.msg,
                    imgSrc: data.imgSrc
                });
                $rootScope.$broadcast('updated');
            });
            sockets[nsp] = socket;
        },
        send: function(on) {
            var soc = sockets[on.nsp];
            soc.emit('msg:new', {
                from: soc.id,
                msg: on.nspMsgToSend,
                fromName: 'Nirav Shah',
                imgSrc: on.imgSrc
            });
        },
        getMessage: function() {
            return nspMsgRecd;
        }
    }
}