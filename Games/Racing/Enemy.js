class Enemy{
    constructor(plane){
        this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
        this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.plane = plane;
    }

    begin(){
        this.plane.add(this.cube);
        this.cube.position.y= 20;
        this.cube.position.z= 0.5;
        this.cube.position.x = Math.random() *5;  //TODO
        console.log(this.cube.position.x);
    }

    update(){
        this.cube.position.y-=1;
    }
}