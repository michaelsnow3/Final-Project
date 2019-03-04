var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const PORT = 3001

io.on('connection', function (socket) {
  io.emit('this', { will: 'be received by everyone'});

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});

io.listen(PORT);
console.log(`listening on port ${PORT}`)