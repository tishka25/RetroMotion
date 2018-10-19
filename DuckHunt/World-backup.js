class World {
  constructor(cursor) {
    this.cursor=cursor;
    this.lifes=5;
    this.birds = [];
    this.dirX = [0];
    this.dirY = [0];
    this.score = 0;
    this.highScore=0;
    this.changeDirTimer = 500;
    this.spawnBirdTimer = 1000;
  }

  begin() {
    this.addBird().changeAnimation("default");
    this.spawnBirdInterval = setTimeout(this.spawnBird.bind(this), this.spawnBirdTimer);
    this.changeDirectionInverval = setTimeout(this.changeDirection.bind(this), this.changeDirTimer);
  }


  update() {
    drawSprites();

    //Handle the movement and drawing of all birds
    for (var i = 0; i < allSprites.length; i++) {
      if(allSprites[i].getAnimationLabel()==="kill" || allSprites[i].getAnimationLabel()==="shot"){
        this.dirX[i] = 0;
        this.dirY[i] = 8;
      }

      //Correct the direction the birds moves
      if (allSprites[i].position.x > width || allSprites[i].position.x < 0) {
        this.pickNewDirection(i);
      }

      // allSprites[i].rotation=allSprites[i].getDirection();
      if(allSprites[i].getAnimationLabel()==="default" || allSprites[i].getAnimationLabel()==="kill"){
        allSprites[i].velocity.x=this.dirX[i];
        allSprites[i].velocity.y=this.dirY[i];
      }

      //If the bird goes out of screen delete it and decreace the score
      this.scoreHandler(i);
      //Handle the distance between cursor and "duck" and killing
      this.cursorHandler(i);

    }
    //Show the score and other text
    this.textHandler();
  }



  cursorHandler(i) {
    this.cursor.update();
    // if (mouseIsPressed || this.cursor.clicked) {
    // if (Number(window.serverShot)==1) {
      if (allSprites[i]!==undefined && dist( allSprites[i].position.x,  allSprites[i].position.y, this.cursor.positionX, this.cursor.positionY) <= allSprites[i].width && window.serverShot &&
        allSprites[i].getAnimationLabel()==="default"){
        allSprites[i].setVelocity(0,0);
        allSprites[i].changeAnimation("shot");
        this.score++;
        setTimeout(function(){allSprites[i].changeAnimation("kill");},300);
      }
    }


  //Small functions
  pickNewDirection(i){
    this.dirX[i] = (random(-8 - (this.score / 5), 8 + (this.score / 5)));
    this.dirY[i] = (random(-1 - (this.score / 5), -2 - (this.score / 5)));
  }

  //End


  //Interval callback functions
  changeDirection() {
    for (var i = 0; i < allSprites.length; i++) {
      if (allSprites[i].getAnimationLabel()==="default") {
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
    if (this.birds.length < 2) {
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
      if (isNaN(allSprites[i].position.x) ||
        isNaN(allSprites[i].position.y) ||
        allSprites[i].position.y<0 ||
        allSprites[i].position.y>height){
          allSprites[i].remove();
        }

        if((allSprites[i].getAnimationLabel()==="shot" && !allSprites[i].animation.playing)){
          allSprites[i].changeAnimation("kill");
        }
    }
  }

  scoreHandler(index) {
    if (allSprites[index].position.y < 0 && this.score > 0) {
        allSprites[index].remove();
        this.score--;
        // this.lifes--;
    }
    if(this.score>=this.highScore){
      this.highScore=this.score;
    }
  }

  textHandler() {
    textSize(26);
    text("Score: " + this.score, 60, 20);
    text("High Score: "+ this.highScore,60,50);
  }


  addBird(){
    var bird=createSprite(random(width / 4, width-100),height,this.cursorSize,this.cursorSize);
    bird.addAnimation("default",duck);
    bird.addAnimation("kill",duck_dead);
    bird.addAnimation("shot",duck_shot);
    return bird;
  }

}
