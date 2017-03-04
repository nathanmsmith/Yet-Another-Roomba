const express = require('express');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const router = require('./app/routes');

app.use('/', router);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});