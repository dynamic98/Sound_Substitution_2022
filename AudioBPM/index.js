
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
app.use(express.static(__dirname+'/Visualization_mapping/haptic'));
console.log(__dirname);
console.log("My socket sever is running");

const { Server } = require('socket.io')
const io = new Server(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('mouse', (data) => {
        // io.emit('mouse', data)
        socket.broadcast.emit('mouse', data)
        // console.log(data);
    });
})

server.listen(3000, () => {
    console.log('listening on: 3000')
})