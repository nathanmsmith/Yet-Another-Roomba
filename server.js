const express = require('express');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const PythonShell = require('python-shell');
const router = require('./app/routes');

app.use('/', router);

app.use(express.static(__dirname + '/public'));

PythonShell.run('./scripts/stop.py', (err) => {
  if (err) throw err;
  console.log('Closed Rooomba.');
});

// Connect to Roomba (through python)
PythonShell.run('./scripts/start.py', (err) => {
  if (err) throw err;
  console.log('Connected to Rooomba.');
});


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
    let velocity = 0;
    let radius = 0;

    if (typeof msg.direction !== 'undefined') {
      console.log(msg.direction.angle);
      switch (msg.direction.angle) {
        case 'up':
          velocity = 2 * msg.distance;
          break;
        case 'down':
          velocity = -2 * msg.distance;
          break;
        default:
          break;
      }

      switch (msg.direction.angle) {
        case 'right':
          radius = -1;
          break;
        case 'left':
          radius = 1;
          break;
        default:
          break;
      }
    }

    if (radius !== 0 && velocity === 0) {
      velocity = 75;
    }

    //console.log('Direction changed: ' + msg.direction.angle);
    PythonShell.run('./scripts/move.py', {args: [velocity, radius]}, (err) => {
      if (err) throw err;
      console.log('Changed direction of to velocity:' + velocity + ', radius: ' + radius);
    });
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
  }, 1000);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

process.stdin.resume();//so the program will not close instantly
