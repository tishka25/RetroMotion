class GUI {
  constructor(games) {
    this.cursor = cursor;
    this.games = games;
    this.image;
    this.qrcode = createDiv('');
    this.hrefToConnect;
    this.x = 200 ;
    this.y = height * 0.5;
    this.size = 400 * _pixelDensity;
  }

  begin() {
    noStroke();
  }

  update(){
    push();
    imageMode(CENTER);
    for(var i=0;i<this.games.length;i++){
      var g = this.games[i];
      var step = (this.size*2) * _pixelDensity * i;
      var position = createVector(this.x + step , this.y);
      this.mouseOver(position.x , position.y);
      image(g.image , position.x ,position.y, this.size , this.size);
    }
    pop();
  }


  mouseOver(x , y){
    var d = dist(x,y , mouseX , mouseY);
    var r = sqrt(2 * this.size * this.size) * 0.5;
    if(d <= r){
      push();
      rectMode(CENTER);
      fill(255 , 255 , 255 , 128);
      ellipse(x , y , this.size * 1.2 , this.size * 1.2);
      pop();
    }
  }
}