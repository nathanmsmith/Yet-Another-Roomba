var $ = require('jquery');
var nipplejs = require('nipplejs');


var socket = io();
var joystick = nipplejs.create({
  zone: document.querySelector('.container'),
  color: 'grey'
});


joystick.on('dir:up dir:left dir:down dir:right', function (evt, data) {
  socket.emit('change direction', evt.type);
});

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

function animateNumber(element, numberToAnimateTo) {
  var currentNumber = $(element).text();

  $({numberValue: currentNumber}).animate({numberValue: numberToAnimateTo}, {
    duration: 8000,
    easing: 'linear',
    step: function() {
      $(element).text(Math.ceil(this.numberValue*100)/100);
    }
  });
}

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
