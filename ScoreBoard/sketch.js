var placeholder="placeholder";
let HighScores=[0];
var imageh;
var clouds;
var xClouds;
var yClouds;
function setup() {
  xClouds=-30;
  yClouds=random(20,windowHeight);
  this.socket=io.connect(document.location.host);//document.location.href
  this.socket.on('scores', function (data){
    HighScores=data;
  });
  imageh=loadImage("bck.jpg");
  clouds=loadImage("clouds.png");
  this.socket.emit('scores',HighScores);
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  rectMode(CENTER);
  let data={
    x:mouseX,
    y:mouseY,
    shot:false
  };
  this.socket.emit('dataIn',data);
  
}

function draw() { 
  background(imageh);
  textSize(80);
  image(clouds,xClouds,yClouds,400,200);
  xClouds+=0.5;
  if (xClouds>=windowWidth+500){
    xClouds=-500;
    yClouds=random(20,windowHeight/3);

  }
  for(var i=0;i<HighScores.length;i++){
    if(HighScores[i] !== undefined){
      fill(0+i*50, 200-i*40, 0);
    textSize(80 - i*5);
    text((i+1)+ ")"+ HighScores[i].name + ":" + HighScores[i].score,width/2.8,  200 + (i*150));
    }
    
  }
  WakeUP();  
  console.log(HighScores);
  
  
  // text('1st:'+HighScores[0].name,windowWidth/3.4 , windowHeight/5);
  
  // textSize(70);
  // text('2nd:'+placeholder, windowWidth/3.1, windowHeight/3);
  
  // textSize(60);
  // text('3rd:'+placeholder, windowWidth/2.8, windowHeight/2);

  // textSize(45);
  // text('4th:'+placeholder, windowWidth/2.6,  windowHeight/1.5);
  // text('5th:'+placeholder, windowWidth/2.6,  windowHeight/1.2);

}

function WakeUP(){
  this.socket.emit('scores',HighScores);
}
