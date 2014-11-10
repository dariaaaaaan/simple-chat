var person = "";

 function enterName() {
     person = prompt("Please enter your name ", "");
 
};

var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', person + "" + ": " + $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#TextArea').append($('<p>').text(msg));
  });