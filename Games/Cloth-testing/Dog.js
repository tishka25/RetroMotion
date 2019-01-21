class Dog{
    constructor(pos , animation){
        this.pos = pos;
        this.animation = animation;
    }

    begin(){
        this.pos = new Vec2D(0 , height -50);
        this.animation = createSprite(this.pos.x , this.pos.y , 53 , 40);
        this.animation.addAnimation("walking" , "./assets/animations/dog/dog_walking1.png" , "./assets/animations/dog/dog_walking2.png" ,
         "./assets/animations/dog/dog_walking3.png");

         this.animation.addAnimation("sniffing" ,"./assets/animations/dog/dog_walking4.png" , "./assets/animations/dog/dog_walking5.png");
         
         this.animation.offY = 18;
    }

    update(){
        
        if(this.animation.position.x>width/2){
            this.animation.changeAnimation("sniffing");
        }else{
            this.animation.changeAnimation("walking");
            this.animation.position.x = this.pos.x ++;
        }
    }
}