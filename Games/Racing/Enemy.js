class Enemy{
    constructor(lane){
        this.y = 0;
        this.minSize = 40;
        this.maxSize = 100;
        this.size = this.minSize;
        this.lane = lane;
        this.roadWidth = (width - 400) - 400;
        this.laneWidth = this.roadWidth / 3;
        this.x = 400 + (this.lane * this.laneWidth);
        this.firstX = this.x;
    }

    begin(){

    }

    update(){
        var _scale = map(this.y ,0,height , this.minSize, this.maxSize);
        if(this.lane>1){
            var a = map(this.y , 0 , height , this.firstX , width , true);
            this.x = a ;
        }else if(this.lane<1){
            var a = map(this.y , 0 , height , this.firstX ,0 , true);
            this.x = a ;
        }
        push();
        rect(this.x, this.y, this.size, this.size);
        pop();
        this.y+=1;

        this.size = _scale;
    }
}