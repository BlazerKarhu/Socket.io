'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let users = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('adduser', function (name) {
    users.push(name);
    console.log('a user connected', socket.id, users[socket.id]);
    console.log('users', users);
    console.log('current user', users[socket.id]);

    // attempt to clean up
    socket.once('disconnect', function () {
      var pos = users.indexOf(name);

      if (pos >= 0) users.splice(pos, 1);
    });
  });

  socket.on('disconnect', () => {
    io.emit('user remove', socket.id);
    console.log('a user disconnected', socket.id);
  });

  socket.on('chat message', (msg) => {
    console.log('message: ', msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});
