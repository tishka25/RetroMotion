class World {
  constructor(cursor, bird_animations, bck) {
    this.cursor = cursor;
    this.bck = bck;
    this.user_name;
    this.bird_animations = bird_animations;
    this.lifes = 5;
    this.dirX = [0];
    this.dirY = [0];
    this.score = 0;
    this.stepToGiveLife = 5000;
    this.highScore = 0;
    this.changeDirTimer = 500;
    this.spawnBirdTimer = 1000;
  }

  begin() {
    this.addBird().changeAnimation("default");
    this.spawnBirdInterval = setTimeout(this.spawnBird.bind(this), this.spawnBirdTimer);
    this.changeDirectionInverval = setTimeout(this.changeDirection.bind(this), this.changeDirTimer);
    this.bck.begin();
  }


  update() {
    drawSprites();
    this.bck.update();
    //Handle the movement and drawing of all birds
    for (var i = 0; i < allSprites.length; i++) {
      if (allSprites[i].getAnimationLabel() === "kill") {
        allSprites[i].velocity.x = 0;
        allSprites[i].velocity.y = 8;
      }

      //Correct the direction the birds moves
      if (allSprites[i].position.x > width || allSprites[i].position.x < 0) {
        this.pickNewDirection(i);
      }

      // allSprites[i].rotation=allSprites[i].getDirection();
      if (allSprites[i].getAnimationLabel() === "default") {
        allSprites[i].velocity.x = this.dirX[i];
        allSprites[i].velocity.y = this.dirY[i];
      }

      //If the bird goes out of screen delete it and decreace the score
      this.scoreHandler(i);
      //Handle the distance between cursor and "duck" and killing
      this.cursorHandler(i);

    }
  }



  cursorHandler(i) {
    this.cursor.update();
    // if (mouseIsPressed || this.cursor.clicked) {
    // if (Number(window.serverShot)==1) {
    if (allSprites[i] !== undefined && dist(allSprites[i].position.x, allSprites[i].position.y, this.cursor.positionX, this.cursor.positionY) <= allSprites[i].width && window.serverShot &&
      allSprites[i].getAnimationLabel() === "default") {
      allSprites[i].changeAnimation("shot");
      allSprites[i].setVelocity(0, 0);
      bck.play();
      this.score += 500;
      setTimeout(function () {
        allSprites[i].changeAnimation("kill");
      }, 300);
    }
  }


  //Small functions
  pickNewDirection(i) {
    this.dirX[i] = (random(-5 - (this.score / 2000), 5 + (this.score / 2000)));
    this.dirY[i] = (random(0 - (this.score / 2000), -1 - (this.score / 2000)));
  }
  //End


  //Interval callback functions
  changeDirection() {
    for (var i = 0; i < allSprites.length; i++) {
      if (allSprites[i].getAnimationLabel() === "default") {
        this.pickNewDirection(i);
      }
      //Change the direction of the bird
      if (this.dirX[i] > 0) {
        allSprites[i].mirrorX(1);
      } else if (this.dirX[i] < 0) {
        allSprites[i].mirrorX(-1);
      }
    }

    //Take another time after changing the direction
    this.changeDirTimer = this.timerHandler(500, 1000, 2);
    //Recursive timeout
    this.changeDirectionInverval = setTimeout(this.changeDirection.bind(this), this.changeDirTimer);
  }

  spawnBird() {
    let p = new Promise(function(resolve , reject){

    });
    let f = int(this.score* 0.005);
    if(allSprites.length<f){
        this.addBird().changeAnimation("default");
    }

    //Handle all "bugged" and killed objects
    this.garbageCollector();
    //Take another time after changing the direction
    this.spawnBirdTimer = this.timerHandler(2000, 4000, 5);
    //Recursive timeout
    this.spawnBirdInterval = setTimeout(this.spawnBird.bind(this), this.spawnBirdTimer);
  }


  //All little handlers
  timerHandler(min, max, factorOfScore) {
    factorOfScore = factorOfScore / 1000;
    return random(min - (this.score * factorOfScore), max - (this.score * factorOfScore));
  }

  garbageCollector() {
    for (let i = 0; i < allSprites.length; i++) {
      if ((allSprites[i].getAnimationLabel() === "shot" && !allSprites[i].animation.playing)) {
        allSprites[i].changeAnimation("kill");
      }
      if (isNaN(allSprites[i].position.x) ||
        isNaN(allSprites[i].position.y) ||
        allSprites[i].position.y < 0 ||
        allSprites[i].position.y > height) {
        allSprites[i].remove();
      }
    }
  }

  scoreHandler(index) {
    if (allSprites[index].position.y < 0 && this.score > 0) {
      allSprites[index].remove();
      // this.score--;
      this.lifes--;
    }
    if (this.score >= this.highScore) {
      this.highScore = this.score;
    }
    if (this.score >= this.stepToGiveLife) {
      this.lifes++;
      this.stepToGiveLife += 5000;
    }
  }

  textHandler() {
    textSize(26);
    text("Lifes: " + this.lifes, 60, 20);
    text("Score: " + this.score, 60, 40);
    text("High Score: " + this.highScore, 60, 60);
  }


  addBird() {
    var bird = createSprite(random(width / 4, width - 100), height, this.cursorSize, this.cursorSize);
    bird.addAnimation("default", this.bird_animations[0]);
    bird.addAnimation("kill", this.bird_animations[1]);
    bird.addAnimation("shot", this.bird_animations[2]);
    bird.changeAnimation("default");
    return bird;
  }

}


class Background {
  constructor(frames) {
    this.frames = frames;
  }

  begin() {
    for (var i = 0; i < this.frames.images.length; i++) {
      this.frames.images[i].resize(width, height - (height * 0.4));
    }
    this.stop();
  }

  update() {
    this.frames.draw(width / 2, height - this.frames.getHeight() * 0.5);
  }
  stop() {
    this.frames.stop();
    this.frames.changeFrame(10);
  }
  play() {
    this.frames.changeFrame(0);
    this.frames.goToFrame(this.frames.images.length - 1);
  }
}