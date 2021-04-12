'use strict';

const socket = io();
const btn = document.getElementById('usernamebutton');
btn.addEventListener(
  'click',
  socket.emit('adduser', prompt("What's your name?"))
);

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('m');
  socket.emit('chat message', inp.value);
  inp.value = '';
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.innerHTML = msg;
  document.getElementById('messages').appendChild(item);
});

socket.on('adduser', (username) => {
  socket.emit('adduser', prompt("What's your name?"));
});
