var app = require('http').createServer()
var io = module.exports.io = require('socket.io')(app)

require("dotenv").config();
const PORT = process.env.SOCKET_PORT || 3005
const QueueOperator = require("./QueueOperator");

let users = {
  'abc@gmail.com': {
    currentMusicData: { album: 'Sweetener', artist: 'Ariana Grande', song: 'raindrops (an angel cried)' },
    locationInfo:
      {
        longitude: -79.40227565453004,
        latitude: 43.64407861007,
        timestamp: 1552082456.135453
      },
    doesntLike: []
  },
  'def@gmail.com':{
    currentMusicData: { album: '戀愛的力量', artist: 'Fish Leong', song: '勇氣' },
    locationInfo:
    {
      longitude: 120.58225979466396,
      latitude: 24.504068145075146,
      timestamp: 1552157136.9262118
    }
  },
  'ghi@gmail.com':{
    currentMusicData: { album: '忠孝東路走九遍', artist: 'Power Station', song: '忠孝東路走九遍' },
    locationInfo:
    {
      longitude: -79.399672,
      latitude: 43.671502,
      timestamp: 1552157136.9262118
    }
  }
};

io.on('connection', function (socket) {

  console.log('user connected');
  const userQueueOperator = new QueueOperator();

  socket.on('message', function (data) {
    socket.emit(data.chatroomId, {
      messageSend: true
    })
  });

  socket.on('usersQueue', function (data) {
    users = userQueueOperator.addUserInfoQueue(users, data);
    // console.log("------ user start ------");
    // console.log(users);
    // console.log("------ user end ------");
  });

  socket.on('findPeople', function (data) {
    console.log("In findPeople");
    let match = userQueueOperator.pairPeopleFromQueue(users, data.myEmail, socket);
    socket.emit('findMatchPeople', match);
  });
});

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`)
})