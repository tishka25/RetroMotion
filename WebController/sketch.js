//CONTROLER

var xDif=0;
var yDif=0;
var sensitivity=1;
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
var b =false;
function setup() {
  var ip=document.location.host.replace('300','400');
  // openWSConnection(ip);
  var  webSocketURL = "ws://" + ip;
  webSocket= new WebSocket(webSocketURL);
  createCanvas(windowWidth, windowHeight); 
  frameRate(120);
  x=width/2;
  y=height/2;
  
  webSocket.onopen = function(){
    // webSocket.send("["+xDif*sensitivity+","+yDif*sensitivity+","+ 0 +"]");
    b = true;
    console.log("OKUREEEC");
  };
  webSocket.onmessage= function(e){
    console.log(e.data);
  };

  document.addEventListener("onunload",function(){
    webSocket.close();
  });
}

function draw() {
  //resizeCanvas(windowWidth, windowHeight); 
  background(255,0,0);
  rect(x,y,50,50);

  if(b === true){
    webSocket.send("["+yDif*-sensitivity+","+xDif*-sensitivity+","+ 0 +"]");
  }
  //sendMessage("["+xDif*sensitivity+","+yDif*sensitivity+","+ shoot.pressed +"]");
  
  // sendMessage("["+xDif*sensitivity+","+yDif*sensitivity+","+ 0 +"]");
}
