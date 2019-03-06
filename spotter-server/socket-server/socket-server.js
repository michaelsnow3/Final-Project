var app = require('http').createServer()
var io = module.exports.io = require('socket.io')(app)

require("dotenv").config();
const PORT = process.env.SOCKET_PORT || 3005

io.on('connection', function (socket) {

  console.log('user connected')

  socket.on('message', function (data) {
    socket.emit(data.chatroomId, {
      messageSend: true
    })
  });

});

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`)
})