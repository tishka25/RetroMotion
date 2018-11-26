let serverX=0;
let serverY=0;
var serverShot=false;

class Cursor{
  constructor(_default , _clicked){
    this.cursor_default = _default;
    this.cursor_clicked = _clicked;
    this.sprite = this.cursor_default;
    this.cursorSize=80;
    this.clicked = false;
    this.positionX=width/2;
    this.positionY=height/2;
    this.socket;
    this.sensitivity;
  }

  begin(){
    //Socket connection
    // this.socket=io.connect(document.location.host);//document.location.href
    // this.socket.on('dataIn', function (data){
    //   serverX=data.x;
    //   serverY=data.y;
    //   serverShot=data.shot;
    // });
    //end
  }

  update(){
    //Update the current position
    // if(!(this.positionX+serverX<0 ||
    //    this.positionX+serverX>width ||
    //    this.positionY+serverY<0 ||
    //    this.positionY+serverY>height) && this.socket.connected){ //Warning
    //   this.positionX+=serverX;
    //   this.positionY+=serverY;
    // }
    this.positionX = mouseX;
    this.positionY = mouseY;
    //Draw the cursor
    push();
    translate(this.positionX,this.positionY);
    this.clicked = serverShot;
    image(this.sprite,0,0,this.cursorSize,this.cursorSize);
    pop();
    //end
    if(this.clicked){
      this.sprite = this.cursor_clicked;
    }else{
      this.sprite = this.cursor_default;
    }

    //Wake the socket events
    let data={
      x:mouseX,
      y:mouseY,
      shot:false
    };
    // this.socket.emit('dataIn',data);

  }

}
