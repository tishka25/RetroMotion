class GUI {
  constructor(game) {
    this.start = false;
    this.inp;
    this.button;
    this.cursor = cursor;
    this.game = game;
    this.image = loadImage("assets/button.png");
    this.qrcode = createDiv('');
    this.hrefToConnect = document.location.host.replace('300' , '400') + "/controller";  }

  begin() {
    rectMode(CENTER);
    this.drawing();
    this.qrMaker();

    this.inp = createInput('');
    this.inp.position(width * 0.5 - this.inp.width * 0.5, height * 0.5 - (this.inp.height * 0.5 - 150));
    this.button = createButton("Start!").position(this.inp.x, this.inp.y + this.inp.height + 10);
    this.button.mousePressed(this.submitName.bind(this));
    this.game.begin();
  }

  update() {
    if (this.game.lifes <= 0) //End Game
      this.gameOver();
    if (this.start) {
      this.game.update();
      this.textHandler();
    } else {
      this.drawing();
    }
  }
  startGame() {
    this.start = true;
  }
  gameOver() {
    // this.image = loadImage("assets/button.png");
    this.start = false;
    //Reset the score and lifes
    this.game.score = 0;
    this.game.lifes = 5;
    //Show the input and button
    this.button.show();
    this.inp.show();
    this.qrcode.show();
    //Start the timers in the game
    this.game.begin();
  }

  submitName() {
    this.game.user_name = this.inp.value();
    this.button.hide();
    this.inp.hide();
    this.qrcode.hide();
    this.startGame();
  }
  drawing() {
    background(120);
    // this.image.width = width / 2;
    // this.image.height = height / 2;
    // image(this.image, this.image.width / 2, this.image.height / 2);
  }

  textHandler() {
    textSize(26);
    text("Lifes: " + this.game.lifes, 60, 20);
    text("Score: " + this.game.score, 60, 40);
  }
  qrMaker() {
    this.drawing();
    this.qrcode.id('qrcode');
    var qr = new QRCode(document.getElementById('qrcode'), this.hrefToConnect);
    this.qrcode.position(width * 0.5 - qr._htOption.width * 0.5, height * 0.5 - qr._htOption.height * 0.5);
  }
}