var img;
var vid;
var theta = 0;
var gas=1;
var x=600;
var y=150;
var z=460;
function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  img = loadImage("assets/t.png");
 
}

function draw(){
  background(0);
  
  push();
  translate(x,y,z);

    
    rotateX(110);
    rotateZ(theta);

    texture(img);
    plane(1600, 1600);
  pop();
  if(keyIsPressed && key==='w'){
    x*=1.01;
    //y/=1.1;

  }
  if(keyIsPressed && key==='s'){
    x/=1.01;
    //y*=1.1;

  }
  if(keyIsPressed && key==='d'){
    theta += 2;
    console.log(theta);
  }
  if(keyIsPressed && key==='a'){
    theta -= 2;
    console.log(theta);
  }
}