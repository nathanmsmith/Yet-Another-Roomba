const express = require('express');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const PythonShell = require('python-shell');
const router = require('./app/routes');

app.use('/', router);

app.use(express.static(__dirname + '/public'));

var request = require('request');

// Not required anymore.
//io.on('connection', function(socket) {
//  socket.broadcast.emit('draw',{x: 0, y : 0}); // The starting point is always 0,0 for the trajectory plot.
//})

var coord_url = "http://localhost:666"

PythonShell.run('./scripts/data.py', (err) => {
  if (err) throw err;
  console.log('Started server.');
});

var position = {x : 0, y : 0};
var totalAngle = 0;

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

  }, 1000);

// draw takes e.beg_x,e.beg_y, e.end_x, e.end_y


//We must transform the directions given into an x y coord to display as a line
function parse(body)
{
  var x_coord = Math.cos(body.angle) * 180/Math.PI * body.distance
  var y_coord = Math.sin(body.angle) * 180/Math.PI * body.distance
  return {x : x_coord, y : y_coord}
  //return {x : num, y : num}
}

/*
 * Get the coordinates at regular interval to trigger a draw event
 */
setInterval(() => {

    request({
      url: coord_url,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        //console.log(body) // Print the json response
        //coords = JSON.parse(body)
        body.angle = totalAngle + body.angle;
        var next = parse(body)

        socket.emit('sensor data', {
          distance: body.distance,
          angle: body.angle,
          cliffFrontRightSignal: body['cliff front right signal'],
          cliffFrontLeftSignal: body['cliff front right signal'],
          cliffRightSignal: body['cliff right signal'],
          cliffLeftSignal: body['cliff left signal'],
          cliffFrontRight: body['cliff front right'],
          cliffFrontLeft: body['cliff front left'],
          cliffLeft: body['cliff left'],
          cliffRight: body['cliff right'],
        });

        if(next.distance != 0 && next.angle != 0)
        {
          socket.emit('draw', {beg_x: position.x + 500, beg_y : position.y + 500, end_x : next.x + position.x + 500 , end_y : next.y + position.y + 500});
        }

        position.x = next.x;
        position.y = next.y;
      }
    });
  }, 1000);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

process.stdin.resume();//so the program will not close instantly
