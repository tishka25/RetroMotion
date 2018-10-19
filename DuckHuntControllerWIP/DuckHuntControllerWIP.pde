import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import websockets.*;

TEXTBOX ipAddress = new TEXTBOX(160, 353, 600, 150);
Context context;
SensorManager manager;
Sensor sensorA;
Sensor sensorG;
//AccelerometerListener listenerA;
GyroscopeListener listenerG;

float x,y,z;
float xDif,yDif;
float ax, ay, az;
float gx, gy, gz;
float prevX,prevY,prevZ;
float crosshairX;
float crosshairY;
int sensitivity=50;
     
WebsocketClient wsc;
     
void setup() {
  fullScreen();
  crosshairX=width/2;
  crosshairY=height/2;
  context = getActivity();
  manager = (SensorManager)context.getSystemService(Context.SENSOR_SERVICE);
  sensorA = manager.getDefaultSensor(Sensor.TYPE_LINEAR_ACCELERATION);
  //sensorA = manager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
  sensorG = manager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
  //listenerA = new AccelerometerListener();
  listenerG = new GyroscopeListener();
  //manager.registerListener(listenerA, sensorA, SensorManager.SENSOR_DELAY_GAME);
  manager.registerListener(listenerG, sensorG, SensorManager.SENSOR_DELAY_GAME);
  ipAddress.BorderWeight = 3;
  ipAddress.BorderEnable = true;

  textFont(createFont("SansSerif", 30 * displayDensity));
  
  wsc= new WebsocketClient(this, "ws://192.168.0.103:8080");
}

void draw() {
  background(255);
  ipAddress.DRAW();
  x=gz; //Best results
  y=gx;
  
  //x=gz+ax/5;    //More "realistic"
  //y=gx+(-az)/5;
  
  //x=ax; //Testing
  //y=height/2;
  
  text("X: " + x + "\nY: " + y, 0, 0, width, height);
  if(prevX==0||prevY==0){
    prevX=x;
    prevY=y;
   
  }
  if(prevX!=x||prevY!=y){  
    xDif=prevX-x;
    yDif=prevY-y;
    wsc.sendMessage("["+xDif+","+yDif+"]");
    ///DEBUG
    if(crosshairX>width){
      crosshairX=width;
    }
    if(crosshairX<0){
      crosshairX=0;
    }
    if(crosshairY>height){
      crosshairY=height;
    }
    if(crosshairY<0){
      crosshairY=0;
    }
    stroke(255,0,0);
    strokeWeight(100);    
    point(crosshairX+=(xDif)*sensitivity,crosshairY+=(yDif)*sensitivity);
    ///DEBUG
    
  }
}

//class AccelerometerListener implements SensorEventListener {
//  public void onSensorChanged(SensorEvent event) {
//    ax = event.values[0];
//    ay = event.values[1];
//    az = event.values[2];    
//  }
//  public void onAccuracyChanged(Sensor sensorA, int accuracy) {
//  }
//}

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
   ipAddress.PRESSED(mouseX, mouseY);
   if(ipAddress.selected){
     openKeyboard();
   }
   else{
     closeKeyboard();
   }
}

void Submit() {
   text("CONNECTING TO " + ipAddress.Text,100,100);
}

void keyPressed() {
  if (ipAddress.KEYPRESSED(key, (int)keyCode)) {
    Submit();
  }
}

void webSocketEvent(String msg){
 println(msg);
}
