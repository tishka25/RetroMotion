var placeholder="placeholder";
let HighScores=[0];
var imageh;
var clouds;
var xClouds;
var yClouds;

var GAME_NAMES = ['Duck Hunt','Outrun','Fruit Ninja'];
var currentGame = GAME_NAMES[0];




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

  var buff = 0;
  setInterval(function(){
    if(buff>=GAME_NAMES.length){ buff = 0;}
    currentGame = GAME_NAMES[buff];
    buff++;
  } , 2000);


}

function draw() { 
  background(imageh);


  textSize(80);
  image(clouds,xClouds,yClouds,400,200);
  xClouds+=0.5;
  if (xClouds>=windowWidth+500){
    xClouds=-500;
    yClouds=random(20,windowHeight/5);
  }

  var a = HighScores.filter(scores => scores.gamename == currentGame);

  for(var i=0;i<a.length;i++){
    textSize(150);
    text(currentGame , 10,100);
    var scores = a;    
    if(currentGame !== "Outrun"){
      scores = scores.sort(function( a , b){
        return (b.score -a.score);
      });
      //scores.score[i]=formatTime(scores[i].score);
    }
    fill(0+i*50, 200-i*40, 0);
    textSize(80 - i*5);
    if(currentGame !== "Outrun"){

    text((i+1)+ ")" + scores[i].name + ":" + scores[i].score,10,  200 + (i*100));
    }else{
      text((i+1)+ ")" + scores[i].name + ":" + formatTime(scores[i].score),10,  200 + (i*100));

    }
  }
  WakeUP();  
  // console.log(HighScores);
  
  
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


function formatTime(dt) {
  var minutes = Math.floor(dt/60);
  var seconds = Math.floor(dt - (minutes * 60));
  var tenths  = Math.floor(10 * (dt - Math.floor(dt)));
  if (minutes > 0)
    return minutes + "." + (seconds < 10 ? "0" : "") + seconds + "." + tenths +"min";
  else
    return seconds + "." + tenths+"s";
}