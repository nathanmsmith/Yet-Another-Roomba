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

var socket = io();
$('form').submit(function() {
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg));
});
