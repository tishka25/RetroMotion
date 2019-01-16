//to be compatible in JS, create references to the classes
//as you will use them in p5.js
var VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
    VerletParticle2D = toxi.physics2d.VerletParticle2D,
    Vec2D = toxi.geom.Vec2D,
    Rect = toxi.geom.Rect,
    GravityBehavior = toxi.physics2d.behaviors.GravityBehavior,
    RectConstraint = toxi.physics2d.constraints.RectConstraint,
    AttractionBehavior = toxi.physics2d.behaviors.AttractionBehavior,
    ConstantForceBehavior = toxi.physics2d.behaviors.ConstantForceBehavior,
    ParticleString2D = toxi.physics2d.ParticleString2D;


// var NUM_PARTICLES = 10; 

var physics = null;
// var head = [];
// var tail = [];

// var stringPart = [];
// var wind = null;

var mouseAttractor = null;
var mousePos = null;
// var particlesWidth = null;

var grass1 = null;
var grass2 = null;
var grass3 = null;

function setup() {
  createCanvas(256, 240);
  frameRate(120);
  noSmooth();
  document.getElementById("defaultCanvas0").style = "width: 100%; height: 100%;";


  physics = new VerletPhysics2D(new Vec2D(0, 1));
  physics.setWorldBounds(new Rect(0, 0, width, height));

  grass3 = new Grass(color(0,100,0 , 100) ,2);
  grass2 = new Grass(color(0,150,0 , 100) ,3);
  grass1 = new Grass(color(0,200,0 , 100) ,3);



  grass3.begin();
  grass2.begin();
  grass1.begin();
  
  // particlesWidth = width/2;
  // wind= new Vec2D(0, 0);
  // physics=new VerletPhysics2D(new Vec2D(0,1));

  // physics.setWorldBounds( new Rect(0,0,width,height));
  // for(var i=0;i<particlesWidth;i++){
  //   var stepDir=new Vec2D(1, random(1,3) );
  //   stringPart.push(new ParticleString2D(physics, new Vec2D(), stepDir, NUM_PARTICLES, -10, 0.5));
  //   head.push(stringPart[i].getHead());
  //   tail.push(stringPart[i].getTail());
  // }
  // for(var i=0;i<particlesWidth;i++){
  //   head[i].set((i*2),height);
  //   head[i].lock();
  //   tail[i].unlock();
  // }

  mousePos = new Vec2D(mouseX, mouseY);

  grass1.addAttractor(new AttractionBehavior(mousePos, 50, 0.4));
  grass2.addAttractor(new AttractionBehavior(mousePos, 50, 0.2));
  grass3.addAttractor(new AttractionBehavior(mousePos, 50, 0.1));
}

function draw() {
  background(0,100,255);
  noFill();


  mousePos.set(mouseX,mouseY);
  physics.update();

  grass3.update();
  grass2.update();
  grass1.update();
  // stroke(0,255,0);
  
  // grass3.update();
}