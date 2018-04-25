class Ship extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key_texture,frame){
        super(scene,x,y,key_texture,frame);
        let scale = 0.15;

        this.setScale(scale);

        this.scene = scene;
        this.scene.add.existing(this);

        this.play('shipFly');
        
        //adding this sprite to the scene physics == giving our sprite a physical body
        //can be ommited if we add this to physics group but we will want to access the "body" property here
        this.scene.physics.add.existing(this,false);
        //set the colliders shape to be a circle
        this.body.setSize(this.width,this.height);

    }

    kill(value){
        this.disableBody(true, true);
        
    }

}