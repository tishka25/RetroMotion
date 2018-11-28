var express = require('express')
var app = express()


//Variable so that the controller knows which page you are on
var pageName = null;
//
var server = app.listen(3000, listening);
//Websockets array
//CONSTANTS
const POSITION_X = 0;
const POSITION_Y = 1;
const POSITION_Z = 2;
const SHOT = 3;
const USER_NAME = 4;
const IS_EXIT = 5;
//
var curData = [0, 0];
//

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

client.connect();
//TVA E ZA DEBUG ZA MOMENTA NE GO BARAYTE
//app.get('/gun', function (req, res) {
/*client.query("INSERT INTO scores VALUES ('shterkata',12);", (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    //console.log(res.rows[0])
  }
//})
});*/


//SCORE INSERT FROM FRONTEND
app.get('/insert/:name/:score/:gameName', function (req, res) {
  var data = req.params;
  console.log(data);
  client.query("INSERT INTO scores VALUES ('" + data.name + "'," + data.score + ",'" + data.gameName + "');", (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      // console.log(res);
    }
  });
});







var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection:' + socket.id);
  socket.on('dataIn', msg);
  function msg(data) {
    data.x = Number(curData[POSITION_X]);
    data.y = Number(curData[POSITION_Y]);
    data.z = Number(curData[POSITION_Z]);
    data.shot = curData[SHOT];
    data.user_name = curData[USER_NAME];
    data.isExit = curData[IS_EXIT];
    pageName = data.page;
    io.sockets.emit('dataIn', data);
  }

  var tableName = "";

  socket.on('requestTable', function (data) {
    tableName = data.toString();
    console.log(tableName);
  });

  socket.on('scores', msg);
  function msg(data) {
      // client.query("SELECT * FROM scores WHERE gamename= '" + tableName + "' ORDER BY score DESC FETCH NEXT 5 ROW ONLY;", (err, res) => {
      client.query("SELECT * FROM scores ORDER BY score ;",(err, res)=>{  
      if (err) {
          console.log(err.stack)
        } else {
          data = res.rows;
          io.sockets.emit('scores', data);
          console.log(data);
        }
      });
    }
}


// app.get('/gun', function (req, res) {

//   res.send(cords);

// });

app.use('/mainmenu', express.static("Menu"));
app.use('/games/duckhunt', express.static("Games/DuckHunt"));
app.use('/score', express.static("ScoreBoard"));
app.use('/controller', express.static("WebController"));
app.use('/games/fruitninja', express.static("Games/FruitNinja"));
app.use('/games/racing', express.static("Games/Racing"));


const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    curData = JSON.parse(message);
    ws.send(pageName);
    console.log(message);
  });
});

function listening() {
  console.log("Listening...");
}
