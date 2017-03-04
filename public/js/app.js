var socket = io();
var joystick = nipplejs.create({
  zone: document.querySelector('.container'),
  color: 'grey'
});


joystick.on('dir:up dir:left dir:down dir:right', function (evt, data) {
  socket.emit('change direction', evt.type);
});

socket.on('sensor data', function(msg) {
  // display sensor data
  $('.distance').text(msg.distance);
  $('.angle').text(msg.angle);
  $('.cliffSensor').text(msg.cliffSensor);
  $('.bumpSensor').text(msg.bumpSensor);
  $('.dropSensor').text(msg.dropSensor);
  $('.wall').text(msg.wall);
  $('.velocity').text(msg.velocity);
  $('.encoderCount').text(msg.encoderCount);
});

/*
$(document).keydown(function(e) {
  switch(e.which) {
    case 65: // A
    case 37: // Left Arrow Key
      console.log("Left");
      break;
    case 87: // W
    case 38: // up
      console.log("Up");
      break;
    case 68: // D
    case 39: // right
      console.log("Right");
      break;
    case 83: // S
    case 40: // down
      console.log("Down");
      break;
    default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});
*/
