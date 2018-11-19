//CONTROLER

var xDif=0;
var yDif=0;
var sensitivity=1/2;
var webSocket;
//WEBSOCKET

///////////

//GYROSCOPE

var x=0;
var y=0;

var args = {
	frequency:10,
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
var drawn = false;


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
  noCanvas();
  createCanvas(windowWidth, windowHeight); 
  frameRate(120);
  // screen.lockOrientation("portrait-primary");

  window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
  // backgroundImage = loadImage("data/background.png");
  // gun = loadImage("data/shotframe1.png");
  document.addEventListener("touchstart", () => {
    shot = true;

    // setTimeout(()=>shot=false , 100);
    var img = document.getElementById("gun");
    img.src = "data/shotframe2.png";

  });

 document.addEventListener("touchend", () => {
    shot = false;
     var img = document.getElementById("gun");
     img.src = "data/shotframe1.png";
  });


  webSocketsSetup();
}

function draw() {
  if(_connected === true){
    webSocket.send("["+yDif*-sensitivity+","+xDif*-sensitivity+","+ shot +"]");
  }
}
