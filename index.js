
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
app.use(express.static('Visualization_mapping'));

console.log("My socket sever is running");

const { Server } = require('socket.io')
const io = new Server(server);

io.on('connection', (socket) => {
    console.log(socket.id)
})

server.listen(3000, () => {
    console.log('listening on: 3000')
})