class Item{  
  constructor(img,isBomb) {
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
    this.maxHeight=height-0.2*height;
    this.minHeight=0.2*height;
    this.widthMargin=0.05*width;

    this.pWidth=0;
    this.pHeight=0;
    this.pX=0;

    //Other vars
    this.finished=true;

    this.speed=0.3;

    this.lives=0;
    this.score=0;

    this.color=color(255);

    this.img=img;
    this.splash=loadImage("./assets/splash.png");
    this.isBomb=isBomb;
    this.scale=0;
    this.radius=0;

    this.posX;
    this.posY;
  }


  update(curX,curY,curPressed) {
    if (this.finished) {

      this.lives=0;
      this.score=0;

      this.pX=this.widthMargin+random(0, this.maxWidth-2*this.widthMargin);
      this.pHeight=this.minHeight+random(0, this.maxHeight-this.minHeight);
      this.pWidth=random(0, this.maxWidth-this.pX-this.widthMargin);

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
      this.finished=false;
    }
    this.y=-((this.a*this.x*this.x)+(this.b*this.x)+this.c);

    this.posX=((this.x/this.maxX)*this.pWidth)+this.pX;
    this.posY=this.y;

    this.scale=1/(2*(1080/height));
    imageMode(CENTER);
    image(this.img, this.posX ,this.posY ,this.img.width*this.scale,this.img.height*this.scale);

    this.radius=(this.img.height*this.scale)/2;

    if (this.x<=this.maxX)this.x+=this.speed;
    if (this.x>this.maxX){
      this.finished=true;
      if(!this.isBomb){
        this.lives=-1;
      }
    }

    if(dist(curX,curY,this.posX,this.posY)<=this.radius&&curPressed){
      this.finished=true;
      if(!this.bomb){
        this.score=1;
      }
    }

    //console.log(dist(curX,curY,this.posX,this.posY));

  }
}

var Fruit=new Array();

var imgBanana;
var imgCoconut;
var imgGreen_Apple;
var imgKiwi_Fruit;
var imgLemon;
var imgLime;
var imgMango;
var imgPassionfruit;
var imgPeach;
var imgPear;
var imgPineapple;
var imgPlum;
var imgRed_Apple;
var imgStrawberry;
var imgWatermelon;

var imgBackground;

function pickFruit(){
  switch(Math.round(random(1,15))){
    case 1:return imgBanana;
    case 2:return imgCoconut;
    case 3:return imgGreen_Apple;
    case 4:return imgKiwi_Fruit;
    case 5:return imgLemon;
    case 6:return imgLime;
    case 7:return imgMango;
    case 8:return imgPassionfruit;
    case 9:return imgPeach;
    case 10:return imgPear;
    case 11:return imgPineapple;
    case 12:return imgPlum;
    case 13:return imgRed_Apple;
    case 14:return imgStrawberry;
    case 15:return imgWatermelon;
    default:return imgBanana;
  }
}

var prevMX=0;
var prevMY=0;

//Game vars
var NumberOfFruit=1;
var prevNumberOfFruit=1;
var lives=3;
var score=0;

//Timer vars
var prevMillis=0;
var curMillis=0;
var time=135;
var timer=0;
var seconds=0;
var secondsStr="xx";
var minutes=0;

var scale=0;

function setup() {
  //createCanvas(800, 600);
  createCanvas(windowWidth, windowHeight);
  scale=height/1080;
  textSize(100*scale);

  imgBanana = loadImage("./assets/Banana.png");
  imgCoconut = loadImage("./assets/Coconut.png");
  imgGreen_Apple = loadImage("./assets/Green_Apple.png");
  imgKiwi_Fruit = loadImage("./assets/Kiwi_Fruit.png");
  imgLemon = loadImage("./assets/Lemon.png");
  imgLime = loadImage("./assets/Lime.png");
  imgMango = loadImage("./assets/Mango.png");
  imgPassionfruit = loadImage("./assets/Passionfruit.png");
  imgPeach = loadImage("./assets/Peach.png");
  imgPear = loadImage("./assets/Pear.png");
  imgPineapple = loadImage("./assets/Pineapple.png");
  imgPlum = loadImage("./assets/Plum.png");
  imgRed_Apple = loadImage("./assets/Red_Apple.png");
  imgStrawberry = loadImage("./assets/Strawberry.png");
  imgWatermelon = loadImage("./assets/Watermelon.png");
  
  Fruit[0]= new Item(pickFruit(),0);

  imgBackground = loadImage("./assets/background.png");

  background(imgBackground);
}

function draw() {
  background(imgBackground);
  stroke(255);

  curMillis=millis()-prevMillis;

  if(mouseIsPressed){
    strokeWeight(10*scale);
    line(prevMX,prevMY,mouseX,mouseY);
  }
  prevMX=mouseX;
  prevMY=mouseY;

  fill(255);
  noStroke();


  timer=time-int(curMillis/1000);
  seconds=timer-60*int(timer/60);
  secondsStr=seconds;
  if(seconds<10){
    secondsStr="0" + seconds;
  }
  minutes=int(timer/60);
  textAlign(CENTER);
  text(minutes + ":" + secondsStr,width/2,100*scale);

  if(timer<=0){
    gameOver();
  }

  textAlign(LEFT);
  text("Lives:"+lives,10*scale,100*scale);
  textAlign(RIGHT);
  text("Score:"+score,width,100*scale);

  translate(0, height);
  NumberOfFruit=int(curMillis/30000)+1;

  if(prevNumberOfFruit<NumberOfFruit){
    for(prevNumberOfFruit;prevNumberOfFruit<NumberOfFruit;prevNumberOfFruit++){
      Fruit[prevNumberOfFruit]=new Item(pickFruit(),0);
    }
    
  }

  for(var i=0;i<NumberOfFruit;i++){
    Fruit[i].update(mouseX,mouseY-height,mouseIsPressed);
    lives+=Fruit[i].lives;
    score+=Fruit[i].score;
    if(lives<=0){
      gameOver();
    }
    if(Fruit[i].finished){
      Fruit[i].img=pickFruit();
    }
  }



  // console.log(get(mouseX,mouseY));
}

function gameOver(){
  lives=3;
  score=0;
  prevMillis=millis();
  timer=time;
}