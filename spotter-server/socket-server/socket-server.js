var app = require('http').createServer()
var io = module.exports.io = require('socket.io')(app)

require("dotenv").config();
const PORT = process.env.SOCKET_PORT || 3005

const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`)
})