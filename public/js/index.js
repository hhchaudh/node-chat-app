"use strict";

let socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: `Annum Pham`,
    text: `Take pics of me please!`
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log(`Got "newMessage" from server`, message);
});