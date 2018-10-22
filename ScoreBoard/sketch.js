var placeholder="placeholder";
let HighScores=[0];

function setup() {
  this.socket=io.connect(document.location.host);//document.location.href
  this.socket.on('scores', function (data){
    HighScores=data;
  });

 
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
  background(255);
  textSize(80);
  text('1st:'+HighScores[0].name,windowWidth/3.4 , windowHeight/5);
  
  textSize(70);
  text('2nd:'+placeholder, windowWidth/3.1, windowHeight/3);
  
  textSize(60);
  text('3rd:'+placeholder, windowWidth/2.8, windowHeight/2);

  textSize(45);
  text('4th:'+placeholder, windowWidth/2.6,  windowHeight/1.5);
  text('5th:'+placeholder, windowWidth/2.6,  windowHeight/1.2);

}
