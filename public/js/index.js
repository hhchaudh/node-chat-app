"use strict";

let socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log(`Got "newMessage" from server`, message);
  let li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault(); //prevent default submit event

  socket.emit('createMessage', {
    from: 'User', 
    text: $('[name=message]').val()
  }, function () {

  });
});