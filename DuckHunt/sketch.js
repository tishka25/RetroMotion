let duckHunt;
let bck;
let gui;
let cursor;
let backgroundColor=[0,127,255];
function preload(){
  cursor=new Cursor(loadImage("assets/cursor.png"));
  bck=new Background(loadAnimation("assets/animations/sprite_00.png","assets/animations/sprite_01.png","assets/animations/sprite_02.png","assets/animations/sprite_02.png",
  "assets/animations/sprite_03.png","assets/animations/sprite_04.png","assets/animations/sprite_05.png","assets/animations/sprite_06.png","assets/animations/sprite_07.png",
  "assets/animations/sprite_08.png","assets/animations/sprite_09.png","assets/animations/sprite_10.png","assets/animations/sprite_12.png","assets/animations/sprite_13.png","assets/animations/sprite_14.png","assets/animations/sprite_15.png","assets/animations/sprite_16.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  duckHunt = new World(cursor ,[loadAnimation("assets/duck1.png","assets/duck2.png","assets/duck3.png") , loadAnimation("assets/duck_dead.png") ,loadAnimation("assets/duck_shot.png")] , bck);
  cursor.begin();
  // duckHunt.begin();
  gui=new GUI(duckHunt);
  gui.begin();

  frameRate(60);
  rectMode(CENTER);
}

function draw() {
    background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);
    cursor.update();
    gui.update();
}
