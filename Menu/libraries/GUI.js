class GUI {
  constructor(games , cursor) {
    this.cursor = cursor;
    this.games = games;
    this.qrcode = createDiv('');
    this.x = 200 ;
    this.y = height * 0.5;
    this.size = 400 * _pixelDensity;
  }

  begin() {
    noStroke();
    this.cursor.begin();
  }

  update(){
    push();
    imageMode(CENTER);
    //Game icons
    for(var i=0;i<this.games.length;i++){
      var g = this.games[i];
      var step = (this.size*2) * _pixelDensity * i;
      var position = createVector(this.x + step , this.y);
      //Click or hover
      this.mouse(position.x , position.y ,g);
      //  
      image(g.image , position.x ,position.y, this.size , this.size);
      //Text
      textAlign(CENTER);
      textSize(20);
      textStyle(BOLD);
      fill(255 , 255, 255 , 200);
      text(g.name , position.x, position.y + this.size * 0.8);
      //
    }
    //
    pop();
    this.cursor.update();

  }


  mouse(x , y , g){
    var d = dist(x,y , this.cursor.positionX , this.cursor.positionY);
    var r = sqrt(2 * this.size * this.size) * 0.5;
    //TODO cursor.js
    if(d <= r){
      push();
      rectMode(CENTER);
      fill(255 , 255 , 255 , 128);
      ellipse(x , y , this.size * 1.2 , this.size * 1.2);
      pop();
      //TODO cursor.js
      if(mouseIsPressed){
        document.location.pathname = g.url;
      }
    }
  }
}