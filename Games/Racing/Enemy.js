class Enemy{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 100;
        this.minSize = 50;
        this.maxSize = 100;
    }

    begin(){

    }

    update(){
        var _scale = map(this.y ,0,height , this.minSize, this.maxSize);
        push();
        rect(this.x - this.size*0.5, this.y, this.size, this.size);
        pop();
        this.y+=1;
        this.size = _scale;
    }
}