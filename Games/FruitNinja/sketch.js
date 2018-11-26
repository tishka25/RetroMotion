//Game vars
var NumberOfFruit = 1;
var maxNumberOfSplashes = 5;
var curNumberOfSplashes = 0;
var prevNumberOfFruit = 1;
var lives = 3;
var score = 0;
//


class Splash {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.img = loadImage("./assets/splash.png");
    this.isTinted = false;
  }
  update() {
    if (!this.isTinted) {
      this.fastTint(this.img, this.color);
    }
    push();
    translate(0, height);
    imageMode(CENTER);
    image(this.img, this.x, this.y, 200 * myScale, 200 * myScale);
    pop();
  }

  fastTint(img, c) {
    var size = img.width * img.height;
    if (size > 100) {
      img.loadPixels();
      var index;
      var r = c._array[0] * 255,
        g = c._array[1] * 255,
        b = c._array[2] * 255;
      var brightness = (r + g + b) / 3;
      var brightnessPix = 0;
      console.log(size);
      for (var i = 0; i < img.width * img.height; i++) {
        index = i * 4;
        brightnessPix = (img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2]) / 3;
        img.pixels[index] = (brightnessPix / brightness) * r;
        img.pixels[index + 1] = (brightnessPix / brightness) * g;
        img.pixels[index + 2] = (brightnessPix / brightness) * b;
      }
      img.updatePixels();
      this.isTinted = true;
    }
    return img;
  }

}

class Item {
  constructor(img, isBomb) {
    //For equations
    this.x = 0;
    this.y = 0;
    this.a = -1;
    this.b = 1;
    this.c = 0;
    this.D = 0;

    this.x1 = 0;
    this.x2 = 0;
    this.maxX = 0; //Used for comparing x1 and x2
    this.midpoint = 0;

    //Parabola limits
    this.maxWidth = width;
    this.maxHeight = height - 0.2 * height;
    this.minHeight = 0.2 * height;
    this.widthMargin = 0.05 * width;

    this.pWidth = 0;
    this.pHeight = 0;
    this.pX = 0;

    //Other vars
    this.finished = true;
    this.sliced = false;

    this.speed = 0.3;

    this.lives = 0;
    this.score = 0;

    this.img = img;
    this.isBomb = isBomb;
    this.myScale = 0;
    this.radius = 0;
    this.angle = 0;
    this.direction = 1;

    this.posX;
    this.posY;
  }


  update(curX, curY, curPressed) {

    if (this.finished) {
      this.sliced = false;
      this.direction = 1 - 2 * Math.round(random(0, 1));
      this.angle = random(0, 45);

      this.lives = 0;
      this.score = 0;

      this.pX = this.widthMargin + random(0, this.maxWidth - 2 * this.widthMargin);
      this.pHeight = this.minHeight + random(0, this.maxHeight - this.minHeight);
      this.pWidth = random(0, this.maxWidth - this.pX - this.widthMargin);

      this.b = sqrt(4 * this.a * this.c - this.pHeight * 4 * this.a);
      this.D = this.b * this.b - 4 * this.a * this.c;

      if (this.D > 0) {
        this.x1 = (-this.b + sqrt(this.D)) / (2 * this.a);
        this.x2 = (-this.b - sqrt(this.D)) / (2 * this.a);
        this.x = this.x1;
        this.maxX = this.x2;
        if (this.x2 < this.x1) {
          this.x = this.x2;
          this.maxX = this.x1;
        }
        this.midpoint = (this.x1 + this.x2) / 2;
      }
      this.finished = false;
    }

    push();
    if (this.direction == -1) translate(width, 1);
    scale(this.direction, 1);
    this.y = -((this.a * this.x * this.x) + (this.b * this.x) + this.c);

    this.posX = ((this.x / this.maxX) * this.pWidth) + this.pX;
    this.posY = this.y;

    this.myScale = 1 / (2 * (1080 / height));
    push();
    imageMode(CENTER);
    translate(this.posX, this.posY);
    rotate(this.angle += 1);
    image(this.img, 0, 0, this.img.width * this.myScale, this.img.height * this.myScale);
    pop();
    this.radius = (this.img.height * this.myScale) / 2;

    if (this.x <= this.maxX) this.x += this.speed;
    if (this.x > this.maxX) {
      this.finished = true;
      if (!this.isBomb) {
        this.lives = -1;
      }
    }
    if (
      (dist(curX, curY, this.posX, this.posY) <= this.radius && curPressed && this.direction == 1) ||
      (dist(width - curX, curY, this.posX, this.posY) <= this.radius && curPressed && this.direction == -1)
    ) {
      this.finished = true;
      this.sliced = true;
      if (this.isBomb !== 1) {
        this.score = 1;
      } else {
        this.lives = -lives;
      }
    }

    //console.log(dist(curX,curY,this.posX,this.posY));
    pop();
  }
}

var Fruit = new Array();

var Splashes = new Array();

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
var imgBomb;

var imgSplash = new Array();

var imgBackground;

function pickFruit() {
  switch (Math.round(random(1, 30))) {
    case 1:
      return new Item(imgBanana, 0);
    case 2:
      return new Item(imgCoconut, 0);
    case 3:
      return new Item(imgGreen_Apple, 0);
    case 4:
      return new Item(imgKiwi_Fruit, 0);
    case 5:
      return new Item(imgLemon, 0);
    case 6:
      return new Item(imgLime, 0);
    case 7:
      return new Item(imgMango, 0);
    case 8:
      return new Item(imgPassionfruit, 0);
    case 9:
      return new Item(imgPeach, 0);
    case 10:
      return new Item(imgPear, 0);
    case 11:
      return new Item(imgPineapple, 0);
    case 12:
      return new Item(imgPlum, 0);
    case 13:
      return new Item(imgRed_Apple, 0);
    case 14:
      return new Item(imgStrawberry, 0);
    case 15:
      return new Item(imgWatermelon, 0);
    default:
      return new Item(imgBomb, 1);
  }
}

var prevMX = 0;
var prevMY = 0;



//Timer vars
var prevMillis = 0;
var curMillis = 0;
var time = 135;
var timer = 0;
var seconds = 0;
var secondsStr = "xx";
var minutes = 0;

var myScale = 0;
var cursor = null;
var extColor = [];
var _splash = null;

function preload() {
  cursor = new Cursor(loadImage("./assets/katana.png"));

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
  imgBomb = loadImage("./assets/Bomb.png");

  imgSplash[0] = loadImage("./assets/splash.png");

  imgBackground = loadImage("./assets/background.png");

}

var myFont;

function setup() {
  //createCanvas(800, 600);
  createCanvas(windowWidth, windowHeight);
  myScale = height / 1080;
  textSize(100 * myScale);

  angleMode(DEGREES);

  cursor.begin();
  Fruit[0] = new pickFruit();

  toBW(imgSplash[0]);
  // fastTint(imgSplash[0],extractColorFromImage(Fruit[0].img));

  // Splashes[0]={
  //   x:0,
  //   y:0,
  // }
  myFont = loadFont('assets/go3v2.ttf');
  textFont(myFont);
  background(imgBackground);
}

function draw() {
  background(imgBackground);

  for (var i = 0; i < Splashes.length; i++) {
    var s = Splashes[i];
    s.update();
  }
  stroke(255);
  cursor.update();
  curMillis = millis() - prevMillis;

  if (cursor.clicked) {
    strokeWeight(10 * myScale);
    line(prevMX, prevMY, cursor.positionX, cursor.positionY);
  }
  prevMX = cursor.positionX;
  prevMY = cursor.positionY;

  fill(255);
  noStroke();


  timer = time - int(curMillis / 1000);
  seconds = timer - 60 * int(timer / 60);
  secondsStr = seconds;
  if (seconds < 10) {
    secondsStr = "0" + seconds;
  }
  minutes = int(timer / 60);
  textAlign(CENTER);
  text(minutes + ":" + secondsStr, width / 2, 100 * myScale);

  if (timer <= 0) {
    gameOver();
  }

  textAlign(LEFT);
  text("Lives:" + lives, 10 * myScale, 100 * myScale);
  textAlign(RIGHT);
  text("Score:" + score, width, 100 * myScale);

  translate(0, height);
  NumberOfFruit = int(curMillis / 30000) + 1;

  if (prevNumberOfFruit < NumberOfFruit) {
    for (prevNumberOfFruit; prevNumberOfFruit < NumberOfFruit; prevNumberOfFruit++) {
      Fruit[prevNumberOfFruit] = pickFruit();
    }
  }

  for (var i = 0; i < NumberOfFruit; i++) {
    Fruit[i].update(prevMX, prevMY - height, cursor.clicked);
    if (Fruit[i].sliced && !Fruit[i].isBomb) {
      if (Fruit[i].direction == 1) {
        console.log("SLICED");
        Splashes.push(new Splash(Fruit[i].posX, Fruit[i].posY, extractColorFromImage(Fruit[i].img)));

      } else {
        console.log("SLICED");
        Splashes.push(new Splash(width - Fruit[i].posX, Fruit[i].posY, extractColorFromImage(Fruit[i].img)));
      }
      if (Splashes.length >= maxNumberOfSplashes) {
        curNumberOfSplashes = 0;
        Splashes.splice(0, 1);
      }
    }
    lives += Fruit[i].lives;
    score += Fruit[i].score;
    if (lives <= 0) {
      gameOver();
    }
    if (Fruit[i].finished) {
      Fruit[i] = pickFruit();
    }
  }

}

function gameOver() {
  background(0);
  Fruit.length = 0;
  push();
  textSize(30);
  textAlign(CENTER);
  text("GAMEOVER" , width/2 , height/2);
  rect(width/2 , height/2 , 200,200);
  pop();
  setTimeout(()=>{
    window.location.pathname = "/mainmenu";
  } , 1000);
}

function extractColorFromImage(img) {
  img.loadPixels();
  var r = 0,
    g = 0,
    b = 0;
  var index;
  for (var i = 0; i < img.width * img.height; i++) {
    index = i * 4;
    r += img.pixels[index];
    g += img.pixels[index + 1];
    b += img.pixels[index + 2];
  }
  r = Math.round(r / (img.width * img.height));
  g = Math.round(g / (img.width * img.height));
  b = Math.round(b / (img.width * img.height));
  return color(r, g, b);
}

function fastTint(img, c) {
  img.loadPixels();
  var index;
  var r = c._array[0] * 255,
    g = c._array[1] * 255,
    b = c._array[2] * 255;
  var brightness = (r + g + b) / 3;
  var brightnessPix = 0;
  for (var i = 0; i < img.width * img.height; i++) {
    index = i * 4;
    brightnessPix = (img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2]) / 3;
    img.pixels[index] = (brightnessPix / brightness) * r;
    img.pixels[index + 1] = (brightnessPix / brightness) * g;
    img.pixels[index + 2] = (brightnessPix / brightness) * b;
  }
  img.updatePixels();
}

function toBW(img) {
  img.loadPixels();
  var index;
  for (var i = 0; i < img.width * img.height; i++) {
    index = i * 4;
    img.pixels[index] = Math.round((img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2]) / 3);
    img.pixels[index + 1] = img.pixels[index];
    img.pixels[index + 2] = img.pixels[index];
  }
  img.updatePixels();
}


function keyPressed() {
  if (keyCode === ENTER && userName != '') {
    started = true;
  }
}