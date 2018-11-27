//CONTROLER

var xDif = 0;
var yDif = 0;
var zDif = 0;
var userName = "";
var sensitivity = 1 / 2;
var webSocket;
//WEBSOCKET

///////////

//GYROSCOPE

var x = 0;
var y = 0;

var args = {
  frequency: 10,
  gravityNormalized: true,
  orientationBase: GyroNorm.GAME,
  decimalCount: 2,
  logger: null,
  screenAdjusted: false
};


var gn = new GyroNorm();

gn.init(args).then(function () {
  gn.start(function (data) {

    if (x > width) x = width;
    else if (x < 0) x = 0;
    if (y > height) y = height;
    else if (y < 0) y = 0;
    xDif = data.dm.alpha;
    yDif = data.dm.gamma;
    zDif = data.dm.beta;
    y -= data.dm.alpha;
    x -= data.dm.gamma;
  });
}).catch(function (e) {

});

////////////////////
var _connected = false;
var shot = false;
var backgroundImage;
var gun;
var blackBox;
var drawn = false;
var pageName = "null";

//CONSTANTS
var DUCK_HUNT = {
  page: "duckhunt",
  sensitivity: 1 / 4,
  image: ""
};
var FRUIT_NINJA = {
  page: "fruitninja",
  sensitivity: 1 / 2,
  image: ""
};
var RACING = {
  page: "racing",
  sensitivity: 1 / 2,
  image: ""
};
var MAIN_MENU = {
  page: "mainmenu",
  sensitivity: 1 / 2,
  image: ""
}
//

//UI elements
var userNameField = null;
var acceptBtn = null;
//



function webSocketsSetup() {
  var ip = document.location.host.replace('300', '400');
  var webSocketURL = "ws://" + ip;
  webSocket = new WebSocket(webSocketURL);
  webSocket.onopen = function () {
    _connected = true;
  };
  webSocket.onmessage = function (e) {
    pageName = e.data;
  };

  window.onbeforeunload = function (e) {
    webSocket.close();
  };
  window.onunload = function (e) {
    webSocket.close();
  };
}


function preload() {
  DUCK_HUNT.image = loadImage("./data/background.png");
  MAIN_MENU.image = loadImage("./data/main_menu_background.png");
  FRUIT_NINJA.image = loadImage("./data/fruit_ninja_background.png");
}


function setup() {
  noCanvas();
  createCanvas(windowWidth, windowHeight);
  frameRate(120);

  //UI settings
  userNameField = createInput('');
  userNameField.position(width / 2 - userNameField.width / 2, height / 10);
  acceptBtn = createButton("Accept");
  acceptBtn.position(width / 2 - acceptBtn.width/2 , height/10 + userNameField.height + 10);
  acceptBtn.mousePressed(function(){
    userName = userNameField.value();
  });
  //



  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
  // backgroundImage = loadImage("data/background.png");
  // gun = loadImage("data/shotframe1.png");
  document.addEventListener("touchstart", () => {
    if(userName.length>1 && userName!=null){
      shot = true;
    }
    // setTimeout(()=>shot=false , 100)
  });

  document.addEventListener("touchend", () => {
    shot = false;
  });


  webSocketsSetup();
}

function draw() {
  background(255);
  if (_connected === true) {
    switch (pageName) {
      case DUCK_HUNT.page:
        duckhuntPage();
        break;
      case FRUIT_NINJA.page:
        fruitninjaPage();
        break;
      case RACING.page:
        racingPage();
        break;
      case MAIN_MENU.page:
        mainmenuPage();
        break;
      default:
        webSocket.send("[" + yDif * -sensitivity + "," + xDif * -sensitivity + "," + zDif * -sensitivity + "," + shot + "," +"\""+ userName + "\""+ "]");
        break;
    }
  }
}


function duckhuntPage() {
  userNameField.hide();
  acceptBtn.hide();
  background(DUCK_HUNT.image);
  webSocket.send("[" + yDif * -DUCK_HUNT.sensitivity + "," + xDif * -DUCK_HUNT.sensitivity + "," + zDif * -DUCK_HUNT.sensitivity + "," + shot + "," +"\""+ userName + "\"" + "]");
}

function fruitninjaPage() {
  userNameField.hide();
  acceptBtn.hide();
  background(FRUIT_NINJA.image);
  webSocket.send("[" + yDif * -FRUIT_NINJA.sensitivity + "," + xDif * -FRUIT_NINJA.sensitivity + "," + zDif * -FRUIT_NINJA.sensitivity + "," + shot + "," + "\""+ userName + "\""+ "]");
}
function racingPage(){
  userNameField.hide();
  acceptBtn.hide();
  background(100, 0, 0);
  webSocket.send("[" + yDif * -RACING.sensitivity + "," + xDif * -RACING.sensitivity + "," + zDif * -RACING.sensitivity + "," + shot + "," + "\""+ userName + "\""+ "]");
}
function mainmenuPage() {
  background(MAIN_MENU.image);
  userNameField.show();
  acceptBtn.show();
  webSocket.send("[" + yDif * -MAIN_MENU.sensitivity + "," + xDif * -MAIN_MENU.sensitivity + "," + zDif * -MAIN_MENU.sensitivity + "," + shot + "," + "\"" + userName +"\""+ "]");
}