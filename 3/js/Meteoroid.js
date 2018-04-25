class Meteoroid extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key_texture,frame){
        super(scene,x,y,key_texture,frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this,false);
    }

    kill(){
        this.disableBody(true, true);

        
    }

}