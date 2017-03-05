var $ = require('jquery');
var nipplejs = require('nipplejs');

var socket = io();
var joystick = nipplejs.create({
  zone: document.querySelector('.container'),
  color: 'grey'
});

// Tell server when direction change
joystick.on('move', function (evt, data) {
  socket.emit('change direction', data);
});

// Update view when new sensor data is sent
socket.on('sensor data', function(msg) {
  console.log(msg);

  // Total distance
  var distance = parseInt($('.distance').text(), 10);
  distance += parseInt(msg.distance);
  $('.distance').text(distance);

  // Total angle
  var angle = parseInt($('.distance').text(), 10);
  angle += parseInt(msg.angle);
  $('.angle').text(angle);

  $('.cliffFrontRightSignal').text(msg.cliffFrontRightSignal);
  $('.cliffFrontLeftSignal').text(msg.cliffFrontLeftSignal);
  $('.cliffRightSignal').text(msg.cliffRightSignal);
  $('.cliffLeftSignal').text(msg.cliffLeftSignal);
  $('.bumpCenterLeftSignal').text(msg.bumpCenterLeftSignal);
  $('.bumpLeftSignal').text(msg.bumpLeftSignal);
  $('.bumpFrontLeftSignal').text(msg.bumpFrontLeftSignal);
  $('.bumpCenterRightSignal').text(msg.bumpCenterRightSignal);
  $('.bumpRightSignal').text(msg.bumpRightSignal);
  $('.bumpFrontRightSignal').text(msg.bumpFrontRightSignal);
  $('.leftEncoderCount').text(msg.leftEncoderCount);
  $('.rightEncoderCount').text(msg.rightEncoderCount);
  $('.dropLeft').text(msg.dropLeft);
  $('.dropRight').text(msg.dropRight);
  $('.velocity').text(msg.velocity);
  $('.leftVelocity').text(msg.leftVelocity);
  $('.rightVelocity').text(msg.rightVelocity);
  $('.wallSignal').text(msg.wallSignal);
  $('.wallSeen').text(msg.wallSeen);
});

// TODO: animate numbers
/*
function animateNumber(element, numberToAnimateTo) {
  var currentNumber = $(element).text();

  $({numberValue: currentNumber}).animate({numberValue: numberToAnimateTo}, {
    duration: 8000,
    easing: 'linear',
    step: function() {
      $(element).text(Math.ceil(this.numberValue*100)/100);
    }
  });
}*/

// Keyboard support for directions
$(document).keydown(function(e) {

  let distance = 50;
  let direction;

  switch(e.which) {
    case 32: // Space
      distance = 0;
      direction = 'none';
      break;
    case 65: // A
    case 37: // Left Arrow Key
      direction = 'left';
      break;
    case 87: // W
    case 38: // up
      direction = 'up';
      break;
    case 68: // D
    case 39: // right
      direction = 'right';
      break;
    case 83: // S
    case 40: // down
      direction = 'down';
      break;
    default: return; // exit this handler for other keys
  }

  socket.emit('change direction', {
    distance: distance,
    direction: {
      angle: direction
    }
  });

  e.preventDefault(); // prevent the default action (scroll / move caret)
});
/*
var canvas = document.getElementById('map');
var ctx = canvas.getContext("2d");


function draw() {
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = x;
  ctx.lineWidth = y;
  ctx.stroke();
  ctx.closePath();
}

socket.on('move', function(msg) {

});

    function erase() {
        var m = confirm("Want to clear");
        if (m) {
            ctx.clearRect(0, 0, w, h);
            document.getElementById("canvasimg").style.display = "none";
        }
    }

    function save() {
        document.getElementById("canvasimg").style.border = "2px solid";
        var dataURL = canvas.toDataURL();
        document.getElementById("canvasimg").src = dataURL;
        document.getElementById("canvasimg").style.display = "inline";
    }

    function findxy(res, e) {
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw();
            }
        }
    }
*/
