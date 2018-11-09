function setup(){
    createCanvas(window.innerWidth , window.innerHeight ,WEBGL);
    angleMode(DEGREES);
}



var x = -275 , y = 175 , z = 0;
function draw(){
    background(100);
	
	// noStroke();
	fill(50);
	push();
	translate(x, y , z);
	rotateY(0);
    rotateX(90);
    rotateZ(0);

    // box(100);
    plane(width,height);
	pop();

	noFill();
	stroke(255);
	push();
	translate(500, height*0.35, -200);
	sphere(300);
    pop();
    

    if(keyIsPressed){
        if(key==='w'){
            y-=10;
        }else if(key==='s'){
            y+=10;
        }
        if()
    }
}