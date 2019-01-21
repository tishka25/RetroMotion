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




var physics = null;

var mouseAttractor = null;
var mousePos = null;

var gameObject = {
  pos: null, 
  particle: null
}

var grass1 = null;
var grass2 = null;
var grass3 = null;

var dog = null;

function setup() {
  createCanvas(256, 240);
  frameRate(60);
  noSmooth();
  document.getElementById("defaultCanvas0").style = "width: 100%; height: 100%;";


  physics = new VerletPhysics2D(new Vec2D(0, 1));
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.01)));
  physics.setWorldBounds(new Rect(0, 0, width, height));

  grass3 = new Grass(4 , color(50,100,0 , 100) ,4);
  grass2 = new Grass(2 , color(50,150,0 , 100) ,4);
  grass1 = new Grass(0 , color(50,220,0 , 100) ,3);

  grass3.begin();
  grass2.begin();
  grass1.begin();
  
  mousePos = new Vec2D(mouseX, mouseY);



  // gameObject.pos = new Vec2D(width/2 , 100);
  // gameObject.particle = new VerletParticle2D(gameObject.pos);
  // gameObject.particle.addBehavior(new GravityBehavior(new Vec2D(0,1)));
  // gameObject.particle.addConstraint(new RectConstraint(new Rect(-5,height-50,width + 10, height)));



  dog = new Dog();
  dog.begin();

  addGrassAttraction(mousePos,50,1);

}

function draw() {
  background(0,100,255);
  noFill();





  mousePos.set(mouseX,mouseY);

  physics.update();

  grass3.update();
  grass2.update();
  grass1.update();

  drawSprites();


  dog.update();

}

function addGrassAttraction(obj,r,mul){
  grass1.addAttractor(new AttractionBehavior(obj, r, 0.4*mul));
  grass2.addAttractor(new AttractionBehavior(obj, r, 0.2*mul));
  grass3.addAttractor(new AttractionBehavior(obj, r, 0.1*mul));
}