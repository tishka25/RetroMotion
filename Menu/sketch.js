var gui = null;
var _pixelDensity;
var backgroundImage = null; 


var DUCK_HUNT_URL;
var FRUIT_NINJA_URL;


function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    _pixelDensity = height/1080;
    backgroundImage = loadImage("./assets/background_image.png");
    gui = new GUI([
        {
            image:loadImage("./assets/duck_hunt_logo.jpg"),
            name: "Duck Hunt"
        },
        {
            image:loadImage("./assets/fruit_ninja_logo.png"),
            name: "Fruit Ninja Masacre"
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