let serverX=0;
let serverY=0;
var serverShot=false;
var userName = null;

class Cursor{
  constructor(sprite){
    this.sprite=sprite;
    this.cursorSize=150;
    this.clicked = false;
    this.positionX=width/2;
    this.positionY=height/2;
    this.socket;
    this.sensitivy;
  }

  begin(){
    //Socket connection
    this.socket=io.connect(document.location.host);//document.location.href
    this.socket.on('dataIn', function (data){
      serverX=data.x;
      serverY=data.y;
      serverShot=data.shot;
      userName = data.user_name;
    });
    //end
  }

  update(){
    //Update the current position
    if(!(this.positionX+serverX<0 ||
       this.positionX+serverX>width ||
       this.positionY+serverY<0 ||
       this.positionY+serverY>height) && this.socket.connected){ //Warning
      this.positionX+=serverX;
      this.positionY+=serverY;
    }
    //Draw the cursor
    push();
    translate(this.positionX,this.positionY);
    this.clicked = serverShot;
    image(this.sprite,0,0,this.cursorSize,this.cursorSize);
    pop();
    //end

    //Wake the socket events
    let data={
      x:mouseX,
      y:mouseY,
      shot:false,
      page:"fruitninja"
    };
    this.socket.emit('dataIn',data);

  }

}
