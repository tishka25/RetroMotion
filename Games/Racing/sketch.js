var img;
var vid;
var theta = 0;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  img = loadImage("assets/t.png");
 
}

function draw(){
  background(0);
  
  push();
  translate(440,0,0);

    
    rotateX(theta);
    texture(img);
    plane(1000, 1000);
  pop();
  if(keyIsPressed && key==='w'){
    theta += 10;
    console.log(theta);
  }
  if(keyIsPressed && key==='s'){
    theta -= 10;
    console.log(theta);
  }
}