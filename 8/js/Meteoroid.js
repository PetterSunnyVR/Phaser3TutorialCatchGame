class Meteoroid extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key_texture,frame){
        super(scene,x,y,key_texture,frame);
        this.setScale(0.5);
        
        this.scene = scene;
        this.scene.add.existing(this);

        this.play('meteoroidRotate');

        this.scene.physics.add.existing(this,false);
        //set the colliders shape to be a circle
        this.body.setSize(this.width,this.height);
        
        this.body.setCircle(this.body.width/2,this.body.width/2,this.body.width/2);

    }

    kill(){
        this.disableBody(true, true);

        
    }

}