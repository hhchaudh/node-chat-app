"use strict";

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));  // serve stuff in public folder

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: `Haaris Chaudhry`,
    text: `What's up?`,
    createdAt: new Date()
  });

  socket.on('createMessage', (message) => {
    console.log(`got "createMessage" from client: `, message);
  });

  socket.on('disconnect', () => {
    console.log('Lost a client');
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});