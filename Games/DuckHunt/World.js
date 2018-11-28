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
    this.stepToGiveLife = 10;
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
      if (allSprites[i].position.x + 200 > width || allSprites[i].position.x - 200 < 0) {
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
    push();
    textSize(100 * (height / 1080));
    textAlign(LEFT);
    text("Lives:" + this.lifes, 10 * (height / 1080), 100 * (height / 1080));
    textAlign(RIGHT);
    text("Score:" + this.score, width, 100 * (height / 1080));
    pop();


    //Check if it's game over
    if (this.lifes <= 0) {
      this.gameOver();
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
      this.score++;
      setTimeout(function () {
        allSprites[i].changeAnimation("kill");
      }, 300);
    }
  }


  //Small functions
  pickNewDirection(i) {
    this.dirX[i] = (random(-8 - (this.score / 5), 8 + (this.score / 5)));
    this.dirY[i] = (random(-1 - (this.score / 5), -2 - (this.score / 5)));
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
    this.changeDirTimer = this.timerHandler(500, 1000, 20);
    //Recursive timeout
    this.changeDirectionInverval = setTimeout(this.changeDirection.bind(this), this.changeDirTimer);
  }

  spawnBird() {
    if (allSprites.length < int(this.score * 0.1) + 1) {
      this.addBird().changeAnimation("default");
    }
    //Handle all "bugged" and killed objects
    this.garbageCollector();
    //Take another time after changing the direction
    this.spawnBirdTimer = this.timerHandler(2000, 4000, 50);
    //Recursive timeout
    this.spawnBirdInterval = setTimeout(this.spawnBird.bind(this), this.spawnBirdTimer);
  }


  //All little handlers
  timerHandler(min, max, factorOfScore) {
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
    if (allSprites[index].position.y < 0) {
      allSprites[index].remove();
      this.lifes--;
    }
    if (this.score >= this.stepToGiveLife) {
      this.lifes++;
      this.stepToGiveLife += 10;
    }
  }

  addBird() {
    var bird = createSprite(random(width / 4, width - 100), height, this.cursorSize, this.cursorSize);
    bird.addAnimation("default", this.bird_animations[0]);
    bird.addAnimation("kill", this.bird_animations[1]);
    bird.addAnimation("shot", this.bird_animations[2]);
    bird.changeAnimation("default");
    return bird;
  }


  gameOver() {
    push();
    rectMode(CORNER);
    fill(0);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text("GAME OVER", width / 2, height / 2);
    pop();
    
    //TODO remove
    setTimeout(() => {
      window.location.pathname = "/mainmenu";
    }, 1000);
    //Write the score to the data base and then go back to the "/mainmenu"
    loadJSON('insert/'+this.userName+'/'+this.score , function(){
      setTimeout(() => {
        window.location.pathname = "/mainmenu";
      }, 1000);
    });
  }

}


class Background {
  constructor(frames) {
    this.frames = frames;
    this.stepsToFlicker = 20;
  }

  begin() {
    for (var i = 0; i < this.frames.images.length; i++) {
      this.frames.images[i].resize(width, height - (height * 0.4));
    }
    this.stop();
  }

  update() {
    if (duckHunt.score >= this.stepsToFlicker) {
      tint(random(255), random(255), random(255));
      setTimeout(() => this.stepsToFlicker += 5, 5000);
    } else {
      noTint();
    }
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