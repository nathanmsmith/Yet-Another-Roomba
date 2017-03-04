const express = require('express');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const router = require('./app/routes');

app.use('/', router);

app.use(express.static(__dirname + '/public'));


function randNum(min, max) {
  return Math.random() * (max - min) + min;
}

function sendRandom() {
  socket.emit('sensor data', {
    distance: randNum(1, 2),
    angle: randNum(2, 3),
    cliffSensor: randNum(4, 5),
    bumpSensor: randNum(5, 6),
    dropSensor: randNum(6, 7),
    wall: randNum(7, 8),
    velocity: randNum(8, 9),
    encoderCount: randNum(9, 10),
  });
}

io.on('connection', (socket) => {
  socket.on('change direction', (msg) => {
    console.log('Direction changed: ' + msg);
  });

  setInterval(() => {
    socket.emit('sensor data', {
      distance: randNum(1, 2),
      angle: randNum(2, 3),
      cliffSensor: randNum(4, 5),
      bumpSensor: randNum(5, 6),
      dropSensor: randNum(6, 7),
      wall: randNum(7, 8),
      velocity: randNum(8, 9),
      encoderCount: randNum(9, 10),
    });
  }, 500);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
