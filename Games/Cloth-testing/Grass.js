class Grass {
    constructor(startingOffset , _color,maxHeight) {
        this.mainColor = _color;
        this.spawnOffset = startingOffset;
        this.physics = new VerletPhysics2D(new Vec2D(0, 1));
        this.wind = null;
        this.NUM_PARTICLES_PER_OBJECT = 8;
        this.maxHeight=maxHeight;

    }
    begin() {

        this.physics.setWorldBounds(new Rect(0, 0, width, height));
        var stringPart = [];
        var head = [];
        var tail = [];
        var particleStep = 3;
        var particlesWidth = (width / particleStep) - this.spawnOffset;
        this.wind = new Vec2D(0, 0);
        for (var i = 0; i < particlesWidth; i++) {
            var stepDir = new Vec2D(1, random(1, this.maxHeight));
            stringPart.push(new ParticleString2D(this.physics, new Vec2D(), stepDir, this.NUM_PARTICLES_PER_OBJECT, -1, 2));
            head.push(stringPart[i].getHead());
            tail.push(stringPart[i].getTail());
        }
        for (var i = 0; i < particlesWidth; i++) {
            head[i].set((i * particleStep ) + this.spawnOffset, height - 50);
            head[i].lock();
            tail[i].unlock();
        }
        
    }
    update() {
        this.physics.update();
        push();
        var partLen = this.physics.particles.length;
        for (var i = 0; i < partLen - 1; i++) {
            stroke(this.mainColor);
            if (!(i % this.NUM_PARTICLES_PER_OBJECT))
                beginShape();
            var p1 = this.physics.particles[i];
            this.wind.set(random(0, -0.2), 0);
            p1.addForce(this.wind);
            vertex(p1.x, p1.y);
            if (i % this.NUM_PARTICLES_PER_OBJECT)
                endShape();
        }
        pop();
    }

    addAttractor(att){
        this.physics.addBehavior(att);
    }
}