var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

app.use("/style.css", express.static(__dirname + '/style.css'));

app.use("/script.js", express.static(__dirname + '/script.js'));

http.listen(80, function(){
  console.log('listening on *:80');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

