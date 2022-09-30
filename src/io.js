const socketIO = require('socket.io');

let io = null;
function getIO(server) {
    if (io) return io

    io = new socketIO.Server(server);
    io.on('connection', (socket) => {
        console.log('user connected', socket.id);
        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id);
        })
    });
    return io;
}

module.exports = getIO;

