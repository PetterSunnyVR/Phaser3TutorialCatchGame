class LoadingScene extends Phaser.Scene {
    constructor()
    {
        
        super('loadingScene');
    }

    preload(){
        this.load.image('background','assets/sprites/background.png');
        this.load.image('defender','assets/sprites/defender.png');
        this.load.image('ship','assets/sprites/ship.png');
        this.load.image('meteor','assets/sprites/meteor.png');
    }

    create(){
        
        console.log("Loading scene");
        console.log(this);
        game.scene.start('levelScene');
    }
}