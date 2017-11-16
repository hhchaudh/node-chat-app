"use strict";

let socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  let formattedTime = moment(message.createdAt).format('HH:mm');
  let template = jQuery('#message-template').html();

  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  // let li = $('<li></li>');
  // li.text(`${formattedTime} ${message.from}: ${message.text}`);
  //
  // $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  let formattedTime = moment(message.createdAt).format('HH:mm');
  let template = $('#location-message-template').html();

  let html = Mustache.render(template, {
    url: message.url,
    createdAt: formattedTime,
    from: message.from,
  });

  $('#messages').append(html);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault(); //prevent default submit event

  let messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User', 
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

let locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled');
  let originalWidth = locationButton.outerWidth();
  locationButton.text('Sending...').css('width', originalWidth);

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');  //error handling, not after emit callback
  });
});

