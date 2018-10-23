//CONTROLER

var xDif=0;
var yDif=0;
var sensitivity=1/4;
var webSocket;
//WEBSOCKET

///////////

//GYROSCOPE

var x=0;
var y=0;

var args = {
	frequency:5,
	gravityNormalized:true,
	orientationBase:GyroNorm.GAME,
	decimalCount:2,
	logger:null,
	screenAdjusted:false
};


var gn = new GyroNorm();

gn.init(args).then(function(){
  gn.start(function(data){

    if(x>width)x=width;
    else if(x<0)x=0;
    if(y>height)y=height;
    else if(y<0)y=0;
    xDif=data.dm.alpha;
    yDif=data.dm.gamma;
    y-=data.dm.alpha;
    x-=data.dm.gamma;
  });
}).catch(function(e){
  
});

////////////////////
var _connected =false;
var shot=false;
var backgroundImage;
var gun;
var blackBox;


function webSocketsSetup(){
  var ip=document.location.host.replace('300','400');
  var  webSocketURL = "ws://" + ip;
  webSocket= new WebSocket(webSocketURL);
  webSocket.onopen = function(){
    _connected = true;
    console.log("OKUREEEC");
  };
  webSocket.onmessage= function(e){
    console.log(e.data);
  };

  window.onbeforeunload = function(e) {
    webSocket.close();
  };
  window.onunload = function(e) {
    webSocket.close();
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  frameRate(60);
  backgroundImage = loadImage("data/background.png");
  // gun.push(loadImage("data/shotframe1.png") , loadImage("data/shotframe2.png"));
  gun = loadAnimation("data/shotframe1.png" , "data/shotframe2.png");
  gun.stop();
  webSocketsSetup();
  blackBox = ()=> rect(0 , height - ((height/(height - mouseX)) * 100) , width, (height/(height - mouseX)) * 100);
  x=width/2;
  y=height/2;
}

function draw() {
  background(255,0,0);
  image(backgroundImage , 0 , 0 , width, height);
  gun.draw(width/2 , height - gun.getHeight());
  blackBox();
  if(_connected === true){
    webSocket.send("["+yDif*-sensitivity+","+xDif*-sensitivity+","+ shot +"]");
  }
  //Reset the boolean 'shot'
  shot=false;
}

function mousePressed(){
  shot=true;
  //If it works , dont touch it
  setTimeout(()=>gun.changeFrame(1) , 50);
  setTimeout(()=>gun.changeFrame(0) , 90);
  //
  console.log();
}
