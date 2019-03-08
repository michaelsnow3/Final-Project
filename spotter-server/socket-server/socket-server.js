var app = require('http').createServer()
var io = module.exports.io = require('socket.io')(app)

require("dotenv").config();
const PORT = process.env.SOCKET_PORT || 3005
const UserQueue = require("./userQueue");

io.on('connection', function (socket) {

  console.log('user connected');
  const userQueue = new UserQueue({});

  socket.on('message', function (data) {
    socket.emit(data.chatroomId, {
      messageSend: true
    })
  });

  socket.on('usersQueue', function (data) {
    userQueue.setUserIntoQueue(data);
    console.log("------ user start ------");
    console.log(userQueue.getUsersFromQueue());
    console.log("------ user end ------");
  });

  socket.on('findPeople', function (data) {
    console.log("In findPeople, data:");
    console.log(data.myUserToken);

    userQueue
  });
});

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`)
})