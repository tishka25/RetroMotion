var gui = null;
var cursor = null;
var _pixelDensity;
var backgroundImage = null; 
var elsysLogo = null;


var DUCK_HUNT_URL = "games/duckhunt";
var FRUIT_NINJA_URL = "games/fruitninja";
var RACING_URL = "games/racing";



function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    _pixelDensity = height/1080;
    backgroundImage = loadImage("./assets/background_image.png");
    elsysLogo = loadImage("./assets/elsys_logo.png");
    cursor = new Cursor(loadImage("./assets/wii-pointer-ccw.png") , loadImage("./assets/wii-grab-ccw.png"));
    gui = new GUI([
        {
            image:loadImage("./assets/duck_hunt_logo.png"),
            name: "Duck Hunt - Remake",
            url: DUCK_HUNT_URL
        },
        {
            image:loadImage("./assets/fruit_ninja_logo.png"),
            name: "Fruit Ninja - Remake",
            url:FRUIT_NINJA_URL
        },
        {
            image:loadImage("./assets/racing_logo.png"),
            name: "Outrun - Remake",
            url:RACING_URL
        }
        
    ] , cursor);
    gui.begin();

}

function draw(){
    imageMode(CORNER);
    background(backgroundImage);
    imageMode(CENTER);
    image(elsysLogo , width/2 , elsysLogo.height/2);

    gui.update();
}

function windowResized(){
    resizeCanvas(window.innerWidth, window.innerHeight);
}