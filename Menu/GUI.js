class GUI {
  constructor(games) {
    this.cursor = cursor;
    // this.game = game;
    this.image;
    this.qrcode = createDiv('');
    this.hrefToConnect;
  }

  begin() {
  }

  update(){
    push();
    fill(100,0,0);
    rect(20 * _pixelDensity, height*0.5 - 100, 200 * _pixelDensity, 200 * _pixelDensity );
    pop();
  }
}