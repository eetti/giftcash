const express = require('express');
const socket = require('socket.io');
const http = require('http');
const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let nums = [11,5];
let increments = [10, 6];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

setInterval(() => {
    nums[0] += increments[0];
    nums[1] += increments[1];
    io.emit('add', nums);
}, 1000);


server.listen(PORT, () => {
console.log(`listening on *:${PORT}`);
});

