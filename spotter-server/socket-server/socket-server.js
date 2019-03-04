var app = require('http').createServer()
var io = module.exports.io = require('socket.io')(app)

const PORT = process.env.PORT || 3001

const SocketManager = require('./SocketManager')

io.onconnection('connection', SocketManager)

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`)
})