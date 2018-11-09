class Item{  
  constructor(img) {
    //For equations
    this.x=0;
    this.y=0;
    this.a=-1;
    this.b=1;
    this.c=0;
    this.D=0;

    this.x1=0;
    this.x2=0;
    this.maxX=0; //Used for comparing x1 and x2
    this.midpoint=0;

    //Parabola limits
    this.maxWidth=width;
    this.maxHeight=height-0.1*height;
    this.minHeight=0.1*height;

    this.pWidth=0;
    this.pHeight=0;
    this.pX=0;

    this.finished=false;

    this.speed=0.5;

    this.img=img;
  }


  update() {
    if (!this.finished) {

      this.pX=random(0, this.maxWidth);
      this.pHeight=this.minHeight+random(0, this.maxHeight-this.minHeight);
      this.pWidth=random(0, this.maxWidth-this.pX);

      this.b=sqrt(4*this.a*this.c-this.pHeight*4*this.a);
      this.D=this.b*this.b-4*this.a*this.c;

      if (this.D>0) {
        this.x1=(-this.b+sqrt(this.D))/(2*this.a);
        this.x2=(-this.b-sqrt(this.D))/(2*this.a);
        this.x=this.x1;
        this.maxX=this.x2;
        if (this.x2<this.x1) {
          this.x=this.x2;
          this.maxX=this.x1;
        }
        this.midpoint=(this.x1+this.x2)/2;
      }
      this.finished=true;
    }
    this.y=-((this.a*this.x*this.x)+(this.b*this.x)+this.c);
    //fill(255);
    //noStroke();
    //rect(((this.x/this.maxX)*this.pWidth)+this.pX, this.y, 50, 50);
    //make this scalable ;ddd
    image(this.img, ((this.x/this.maxX)*this.pWidth)+this.pX, this.y,this.img.width/5,this.img.height/5);
    if (this.x<=this.maxX)this.x+=this.speed;
    if (this.x>this.maxX)this.finished=false;
  }
}

var Strawberry;
var imgStrawberry;

var Banana;
var imgBanana;

function setup() {
  createCanvas(800, 600);

  imgStrawberry = loadImage("./assets/Strawberry.png");
  Strawberry = new Item(imgStrawberry);

  imgBanana = loadImage("./assets/Banana.png");
  Banana = new Item(imgBanana);

  background(0);
}

var prevMX=mouseX;
var prevMY=mouseY;

function draw() {
  background(0);
  stroke(0,255,0);
  strokeWeight(10);
  line(prevMX,prevMY,mouseX,mouseY);
  setTimeout(function(){
    prevMX=mouseX;
    prevMY=mouseY;
  }, 200);
  translate(0, height);
  Strawberry.update();
  Banana.update();
}
