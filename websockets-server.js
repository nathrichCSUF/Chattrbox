//Nathaniel Richards
//CPSC 349 Assignment 5 Due 10/16
//Chattrbox
var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});

var messages = [];
var topicChanged = false;
console.log("websockets server started");

ws.on("connection",function(socket) {
  console.log("Client Connection established");
  messages.forEach(function(msg){
    socket.send(msg);
  });

  socket.on("message", function(data) {
    console.log("Message received: " + data);
    var message = data;
    if (message.includes("/topic")){
      message = message.substring(6);
      //socket.send("Topic has changed to " + message);
      //console.log("Topic has changed to " + message);
      topicChanged = true;
    }
    else {
      topicChanged = false;
    }

    if (!topicChanged){
      messages.push(data);
    }
    ws.clients.forEach(function(clientSocket){
      if (topicChanged){
        clientSocket.send("Topic has changed to " + message);
      }
      else{
        clientSocket.send(data);
      }
    });
  });
});
