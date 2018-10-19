var express = require('express')
var app = express()

var cords=[0,0,0];
var server=app.listen(3000,listening);
var curData=[0,0];

///socket
var socket = require ('socket.io');

var io=socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection:'+socket.id);
  socket.on('dataIn',msg);
  function msg(data){
    data.x=Number(curData[0]);
    data.y=Number(curData[1]);
    data.shot=curData[2];
    io.sockets.emit('dataIn',data);
    // socket.broadcast.emit('dataIn',data);
    console.log(data);
  }

}


// app.get('/gun', function (req, res) {

//   res.send(cords);

// });

app.use('/duckhunt',express.static("DuckHunt"));



const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    //console.log('received: %s', message);
    curData=JSON.parse(message);
    //console.log(curData);
    // console.log(curData[2]);

  });

  ws.send('something');
});

function listening(){

  console.log("Listening...")

}
