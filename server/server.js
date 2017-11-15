"use strict";

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');

const publicPath = path.join(__dirname, '../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));  // serve stuff in public folder

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log(`got "createMessage" from client: `, message);
    io.emit('newMessage', generateMessage(message.from, message.text)); //emit to every single connection

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // }); //fire to everybody but socket
  });

  socket.on('disconnect', () => {
    console.log('Lost a client');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});