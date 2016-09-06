// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('button-clicked', function(msg){
    console.log('button-clicked: ' + msg);
    io.sockets.emit('button-clicked', msg);
  });
  
  socket.on('answer-received', function(msg){
    console.log('answer-received: ' + msg);
    io.sockets.emit('answer-received', msg);
  });
  
});

// listen for requests :)
var listener = http.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});