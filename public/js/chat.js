"use strict";

let socket = io();

function scrollToBottom() {
  // Selectors
  let messages = $('#messages');
  let newMessage = messages.children('li:last-child');  //last list item in the list
  // Heights
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  let params = $.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
  let ol = $('<ol></ol>');

  users.forEach(function(user) {
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
});

$('#message-form').on('submit', function (e) {
  e.preventDefault(); //prevent default submit event

  let messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
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
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');  //error handling, not after emit callback
  });
});

