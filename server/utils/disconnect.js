"use strict";
const {generateMessage, generateLocationMessage} = require('./message');

let disconnection = ((users, socket, io) => {
  socket.on('disconnect', () => {
    console.log('Lost a client');
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    }
  });
});

module.exports = {disconnection};
