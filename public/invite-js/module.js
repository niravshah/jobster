angular.module('specky-invite', ['ui.bootstrap', 'ui.router', 'ngCookies', 'angular-jwt', 'ngSanitize', 'pageslide-directive', 'ngFileUpload', 'ui.checkbox', 'ui.bootstrap.datetimepicker', '720kb.tooltips', 'btford.socket-io']).
factory('socket', function(socketFactory) {
    var options = {
        transports: ['polling']
    };
    var myIoSocket = io.connect('http://truck-aloha.codio.io:8080',options);    
    var socket = socketFactory({
        ioSocket: myIoSocket
    });
    socket.forward('error');
    socket.forward('message');
    return socket;
});