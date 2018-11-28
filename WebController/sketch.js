//CONTROLER

var xDif = 0;
var yDif = 0;
var zDif = 0;
var userName = "";
var shot = false;
var pageName = "null";
var isExit = false;
var sensitivity = 1 / 2;
var webSocket;
var _connected = false;
//WEBSOCKET

///////////

//GYROSCOPE


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
    xDif = data.dm.alpha;
    yDif = data.dm.gamma;
    zDif = data.dm.beta;
  });
}).catch(function (e) {

});

////////////////////

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
  RACING.image = loadImage("./data/racing_menu_background.png");
}


function setup() {
  noCanvas();
  createCanvas(windowWidth, windowHeight);
  frameRate(120);

  //UI settings
    //Input field and button
    userNameField = createInput('');
    userNameField.position(width / 2 - userNameField.width / 2, height / 10);
    acceptBtn = createButton("Accept");
    acceptBtn.position(width / 2 - acceptBtn.width/2 , height/10 + userNameField.height + 10);
    acceptBtn.mousePressed(function(){
      userName = userNameField.value();
    });
    //

    //Exit button
    var exitButton = createButton("Exit");
    exitButton.size(100,50);
    exitButton.style('-moz-user-select' , 'none');
    exitButton.style('-webkit-user-select' , 'none');
    exitButton.style('-ms-user-select' , 'none');
    exitButton.style('user-select' , 'none');
    exitButton.style('-o-user-select' , 'none');
    exitButton.position(0,0);
    exitButton.mousePressed(function(){
      isExit = true;
      setTimeout(function(){
        isExit = false;
      } , 500);
    });
    // exitButton.touchEnded()(function(){
    //   isExit = false;
    // });
    //


  //



  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
  document.addEventListener("touchstart", () => {
    if(userName.length>1 && userName!=null){
      shot = true;
    }
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
        webSocket.send("[" + yDif * -sensitivity + "," + xDif * -sensitivity + "," + zDif * -sensitivity + "," + shot + "," +"\""+ userName + "\""+ ","+ isExit + "]");
        break;
    }
  }
}


function duckhuntPage() {
  userNameField.hide();
  acceptBtn.hide();
  background(DUCK_HUNT.image);

  if(shot){
    setTimeout(()=>shot=false , 150);
  }

  webSocket.send("[" + yDif * -DUCK_HUNT.sensitivity + "," + xDif * -DUCK_HUNT.sensitivity + "," + zDif * -DUCK_HUNT.sensitivity + "," + shot + "," +"\""+ userName + "\"" + ","+ isExit + "]");
}

function fruitninjaPage() {
  userNameField.hide();
  acceptBtn.hide();
  background(FRUIT_NINJA.image);
  webSocket.send("[" + yDif * -FRUIT_NINJA.sensitivity + "," + xDif * -FRUIT_NINJA.sensitivity + "," + zDif * -FRUIT_NINJA.sensitivity + "," + shot + "," + "\""+ userName + "\""+ ","+ isExit + "]");
}
function racingPage(){
  userNameField.hide();
  acceptBtn.hide();
  background(240,240 , 240);
  image(RACING.image , 0 , height/2);
  webSocket.send("[" + yDif * -RACING.sensitivity + "," + xDif * -RACING.sensitivity + "," + zDif * -RACING.sensitivity + "," + shot + "," + "\""+ userName + "\""+ ","+ isExit + "]");
}
function mainmenuPage() {
  background(MAIN_MENU.image);
  userNameField.show();
  acceptBtn.show();
  webSocket.send("[" + yDif * -MAIN_MENU.sensitivity + "," + xDif * -MAIN_MENU.sensitivity + "," + zDif * -MAIN_MENU.sensitivity + "," + shot + "," + "\"" + userName +"\""+ ","+ isExit + "]");
}