var img;
var score = 0;
var enemy = [];
var player_x = 0 , player_y = 0;
var spawnInterval = null;
var isFocused = false;


window.onfocus = function(){
  isFocused = true;
};
window.onblur = function(){
  isFocused = false;
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  img = loadImage("assets/track.png");
  enemy.push(new Enemy(random(400 , width - 400) , 0));
  // enemy.push(new Enemy(random(400 , width - 400) , 0));
  spawnInterval = setInterval(()=>{
    enemy.push(new Enemy(random(400 , width - 400) , 0));
  } , 2000);
  player_x = width/2 - 50;
  player_y = height - 100;
}

function draw(){
  background(100);
  textAlign(CENTER);
  textSize(20);
  text("Score:" + score , 40,20);
  
  //plane
  push();
  fill(40);
  quad(400, 0 , width - 400 , 0 , width , height, 0, height);
  pop();
  //
  for(var i =0 ;i<enemy.length ; i++){
    var e = enemy[i];
    //Goes out of screen
    if(e.y>=height){
      enemy.splice(i,1);
      score++;
    }
    // if(dist() ){

    // }
    enemy[i].update();
  }
  //Player
  push();
  fill(200,0,0);
  rect(player_x , player_y , 100 , 100);
  pop();
  //

  movement();
}



function movement(){
  if(keyIsPressed){
    switch(key){
      case 'd': player_x+=5; break;
      case 'a': player_x-=5; break;
    }
  }
}
