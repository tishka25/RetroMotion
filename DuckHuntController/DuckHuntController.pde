//FOR SENSORS

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.hardware.SensorEvent; 
import android.hardware.SensorEventListener;

//FOR SOCKETS

import websockets.*;

//FOR WAKELOCK

import android.os.Bundle; 
import android.view.WindowManager;

//FOR SOUND
import processing.sound.*;
SoundFile gunShot;
import ketai.ui.*; 
KetaiVibrate vibe;

Context context;
SensorManager manager;
Sensor sensorG;
GyroscopeListener listenerG;
TEXTBOX addressBar = new TEXTBOX();

PImage plus;
PImage plusClicked;
PImage minus;
PImage minusClicked;
PImage gun;
PImage gunClicked;


PImage bg;

boolean isConnected=false;

float x, y;
float xDif, yDif;
float gx, gy, gz;
float prevX, prevY, prevZ;

PImage crosshair;
float crosshairX;
float crosshairY;

int sensitivity=10;

WebsocketClient wsc;

Button sensitivityUp = new Button();
Button sensitivityDown = new Button();
Button shoot = new Button();

void setup() {

  fullScreen();
  noSmooth();
  orientation(PORTRAIT);  
  bg = loadImage("background2.png");
  bg.resize(width, height);

  crosshair=loadImage("crosshair.png");
  crosshair.resize((int)crosshair.width*(width/1080), (int)crosshair.height*(height/1920));
  crosshairX=(width/2)-(crosshair.width/2);
  crosshairY=(height/2)-(crosshair.height/2);



  plus = loadImage("plus.png");
  plus.resize((int)plus.width*(width/1080), (int)plus.height*(height/1920));

  plusClicked = loadImage("plusClicked.png");
  plusClicked.resize((int)plusClicked.width*(width/1080), (int)plusClicked.height*(height/1920));

  minus = loadImage("minus.png");
  minus.resize((int)minus.width*(width/1080), (int)minus.height*(height/1920));

  minusClicked = loadImage("minusClicked.png");
  minusClicked.resize((int)minusClicked.width*(width/1080), (int)minusClicked.height*(height/1920));

  gun = loadImage("shotframe1.png");
  gun.resize((int)gun.width*(width/1080), (int)gun.height*(height/1920));

  gunClicked = loadImage("shotframe2.png");
  gunClicked.resize((int)gunClicked.width*(width/1080), (int)gunClicked.height*(height/1920));

  sensitivityUp.setImage(plus, plusClicked);
  sensitivityUp.x=width-sensitivityUp.w;
  sensitivityUp.y=height-sensitivityUp.h;

  sensitivityDown.setImage(minus, minusClicked);
  sensitivityDown.x=0;
  sensitivityDown.y=height-sensitivityDown.h;
  
  shoot.setImage(gun,gunClicked);
  shoot.x=(width/2)-(gun.width/2);
  shoot.y=height-(plus.height+gun.height);

  //SENSOR VARIABLES

  context = getActivity();
  manager = (SensorManager)context.getSystemService(Context.SENSOR_SERVICE);
  sensorG = manager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
  listenerG = new GyroscopeListener();
  manager.registerListener(listenerG, sensorG, SensorManager.SENSOR_DELAY_GAME);

  //IP ADDRESS BAR SETTING

  addressBar.X=0;
  addressBar.Y=63*(int)displayDensity;
  addressBar.W=width;
  addressBar.H=35 * (int)displayDensity;
  addressBar.TEXTSIZE=30 * (int)displayDensity;
  addressBar.Background=color(255, 255, 255);
  addressBar.BorderWeight = 3*(int)displayDensity;
  addressBar.BorderEnable = true;

  //SOUND AND VIBRATION

  gunShot = new SoundFile(this, "gunshot.mp3");
  vibe = new KetaiVibrate(this);
}

void draw() {

  //UI
  
  background(bg);
  fill(0);
  textFont(createFont("SFPixelate.ttf", 30 * displayDensity));
  addressBar.DRAW();
  
  noStroke();
  rect(0, height-plus.height, width, plus.height);
  sensitivityUp.update();
  sensitivityDown.update();
  shoot.update();
  
  fill(255);
  text("Sensitivity:" + sensitivity, 0+63*(int)displayDensity, height-60*(int)displayDensity, width, height);
  textFont(createFont("SFPixelate.ttf", 15 * displayDensity));
  text("X: " + x + "\nY: " + y, 0+63*(int)displayDensity, height-30 * displayDensity, width, height);


  //Crosshair and scoket message
  if (sensitivityUp.pressed && sensitivity < 99) {
    sensitivity++;
  } else if (sensitivityDown.pressed && sensitivity > 1) {
    sensitivity--;
  }
  if (shoot.pressed) {
    gunShot.play(); 
    vibe.vibrate(350);
  }

  x=gz;
  y=gx;

  if (prevX==0||prevY==0) {
    prevX=x;
    prevY=y;
  }

  if (prevX!=x||prevY!=y) {  
    xDif=prevX-x;
    yDif=prevY-y;
    if (isConnected) {
      textFont(createFont("SFPixelate.ttf", 30 * displayDensity));
      text("CONNECTED", 0, 40*(int)displayDensity);
      wsc.sendMessage("["+xDif*sensitivity+","+yDif*sensitivity+","+ shoot.pressed +"]"); //Add timeout
    }
    if (crosshairX>width) {
      crosshairX=width;
    }
    if (crosshairX<0) {
      crosshairX=0;
    }
    if (crosshairY>height) {
      crosshairY=height;
    }
    if (crosshairY<0) {
      crosshairY=0;
    }
    stroke(255, 0, 0);
    strokeWeight(100);
  }
  image(crosshair, crosshairX+=(xDif)*sensitivity, crosshairY+=(yDif)*sensitivity);
}

class GyroscopeListener implements SensorEventListener {
  public void onSensorChanged(SensorEvent event) {
    gx = event.values[0];
    gy = event.values[1];
    gz = event.values[2];
  }
  public void onAccuracyChanged(Sensor sensorG, int accuracy) {
  }
}

void mousePressed() {
  addressBar.PRESSED(mouseX, mouseY);
  if (addressBar.selected) {
    openKeyboard();
  } else {
    closeKeyboard();
  }
}

void Submit() {
  wsc= new WebsocketClient(this, "ws://"+addressBar.Text);
  isConnected=true;
}

void keyPressed() {
  if (addressBar.KEYPRESSED(key, (int)keyCode)) {
    Submit();
  }
}

void webSocketEvent(String msg) {
  println(msg);
}

//Prevent phone sleep

void onCreate(Bundle bundle)
{ 
  super.onCreate(bundle);
  getActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
}
