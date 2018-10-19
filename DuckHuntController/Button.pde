class Button {
  boolean pressed=false, isColor=true, isImage=false;
  int x=0, y=0, w=50, h=50;
  
  color backgroundColor=color(255, 0, 0);
  color clickedColor=color(0, 255, 0);
  
  PImage image;
  PImage clickedImage;
  
  long m=millis();
  int delay=200;
  
  Button() {
  }
  Button(int x, int y) {
    this.x=x;
    this.y=y;
  }

  void setColor(color notClicked, color clicked) {
    backgroundColor=notClicked;
    clickedColor=clicked;
    isImage=false;
    isColor=true;
  }

  void setImage(PImage notClicked, PImage clicked) {
    image=notClicked;
    clickedImage=clicked;
    isImage=true;
    isColor=false;
    w=notClicked.width;
    h=notClicked.height;
  }

  void update() {
    if (isColor) {
      fill(backgroundColor);
      rect(x, y, w, h);
    } else if (isImage) {
      image(image, x, y);
    }
    if (mousePressed && millis() - m >= delay) {
      m=millis();
      if (mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h) {
        pressed=true;
        if (isColor) {
          fill(clickedColor);
        } else if (isImage) {
          image(clickedImage, x, y);
        }
      }
    } 
    else {
      pressed=false;
    };
  }
}
