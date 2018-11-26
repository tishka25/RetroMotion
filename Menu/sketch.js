var gui;
var _pixelDensity;

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    _pixelDensity = height/1080;
    gui = new GUI();
    gui.begin();
}

function draw(){
    background(0);

    gui.update();
}

function windowResized(){
    resizeCanvas(window.innerWidth, window.innerHeight);
}