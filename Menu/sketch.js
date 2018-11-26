var gui = null;
var _pixelDensity;
var backgroundImage = null; 


var DUCK_HUNT_URL = "/duckhunt";
var FRUIT_NINJA_URL = "/fruitninja";
var MAIN_MENU_URL = "/mainmenu";


function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    _pixelDensity = height/1080;
    backgroundImage = loadImage("./assets/background_image.png");
    gui = new GUI([
        {
            image:loadImage("./assets/duck_hunt_logo.png"),
            name: "Duck Hunt - Remake"
        },
        {
            image:loadImage("./assets/fruit_ninja_logo.png"),
            name: "Fruit Ninja - Remake"
        }
    ]);
    gui.begin();
}

function draw(){
    imageMode(CORNER);
    background(backgroundImage);

    gui.update();
}

function windowResized(){
    resizeCanvas(window.innerWidth, window.innerHeight);
}