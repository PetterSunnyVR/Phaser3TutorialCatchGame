class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key_texture,frame,velocity){
        super(scene,x,y,key_texture,frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this,false);

        this.play("portalStuff");

        this.body.allowGravity = false;
        //we set the player to be a static body by setting immovable = true
        this.body.immovable = true;
        this.velocity = velocity;
    }

    checkMovement(){
        if(this.scene.cursor.left.isDown){
            //we don't want the player to move beyound the game window so we have if condition
            //because the anchor of our player sprite is in its middle we need to add/subtracts half of its width
            if(this.x-this.width/2>0){
                this.x-=this.velocity;
            }
            
        }else if (this.scene.cursor.right.isDown) {

            if(this.x+this.width/2<this.scene.cameras.main.width){
                this.x+=this.velocity;
            }
            
        }
    }
}