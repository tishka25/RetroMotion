var express = require('express')
var app = express()

var cords=[0,0,0];
var server=app.listen(3000,listening);
var curData=[0,0];

///socket 

//DB 
const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: '172.17.0.1',
  database: 'duckhunt',
  password: '123456',
  port: 5432,
})

client.connect()
//app.get('/gun', function (req, res) {
client.query("INSERT INTO scores VALUES ('shterkata',12);", (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    //console.log(res.rows[0])
  }
//})
});





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

  socket.on('scores',msg2);
  function msg2(data){

    client.query("SELECT * FROM scores ORDER BY score DESC FETCH NEXT 5 ROW ONLY;", (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        data=res.rows;
        io.sockets.emit('scores',data);
      }
    // socket.broadcast.emit('dataIn',data);
  });

}
}


// app.get('/gun', function (req, res) {

//   res.send(cords);

// });

app.use('/duckhunt',express.static("DuckHunt"));
app.use('/score',express.static("ScoreBoard"));
app.use('/score' , express.static("WebController"))



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
