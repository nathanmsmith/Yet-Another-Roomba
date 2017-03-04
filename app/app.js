var $ = require('jquery');
var nipplejs = require('nipplejs');

var socket = io();
var joystick = nipplejs.create({
  zone: document.querySelector('.container'),
  color: 'grey'
});

// Tell server when direction change
joystick.on('dir:up dir:left dir:down dir:right', function (evt, data) {
  socket.emit('change direction', evt.type);
});

// Update view when new sensor data is sent
socket.on('sensor data', function(msg) {
  $('.distance').text(msg.distance.toFixed(5));
  $('.angle').text(msg.angle.toFixed(5));
  $('.cliffSensor').text(msg.cliffSensor.toFixed(5));
  $('.bumpSensor').text(msg.bumpSensor.toFixed(5));
  $('.dropSensor').text(msg.dropSensor.toFixed(5));
  $('.wall').text(msg.wall.toFixed(5));
  $('.velocity').text(msg.velocity.toFixed(5));
  $('.encoderCount').text(msg.encoderCount.toFixed(5));
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
  switch(e.which) {
    case 65: // A
    case 37: // Left Arrow Key
      socket.emit('change direction', 'dir:left');
      break;
    case 87: // W
    case 38: // up
      socket.emit('change direction', 'dir:up');
      console.log("Up");
      break;
    case 68: // D
    case 39: // right
      socket.emit('change direction', 'dir:right');
      console.log("Right");
      break;
    case 83: // S
    case 40: // down
      socket.emit('change direction', 'dir:down');
      console.log("Down");
      break;
    default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

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
