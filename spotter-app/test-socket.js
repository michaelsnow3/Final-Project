const io = require('socket.io-client');
const  socket = io.connect('http://localhost:3001');

userId = 123;

socket.on(userId, function (data) {
  console.log(data);
  socket.emit('private message', { from: 'userId', msg: 'data' });
});