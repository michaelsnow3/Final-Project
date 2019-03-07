const io = require('./socket-server.js').io

module.exports = function(socket) {
  console.log('socket id' + socket.id)
}