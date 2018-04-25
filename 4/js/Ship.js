class Ship extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key_texture,frame){
        super(scene,x,y,key_texture,frame);
        this.scene = scene;
        this.scene.add.existing(this);
        //adding this sprite to the scene physics == giving our sprite a physical body
        //can be ommited if we add this to physics group but we will want to access the "body" property here
        this.scene.physics.add.existing(this,false);
        //set the colliders shape to be a circle
        this.body.setCircle(this.width/2);

    }

    kill(value){
        this.disableBody(true, true);
        
    }

}