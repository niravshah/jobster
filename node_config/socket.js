module.exports = function (io) {
io.sockets.on('connection', function (socket) {
	console.log('Recieved Connection Request!');
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
};