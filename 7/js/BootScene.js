class BootScene extends Phaser.Scene {
    constructor()
    {
        super('bootScene');
    
    }

    preload()
    {
        this.load.image('loading_bar','assets/sprites/loading_bar.png');
        
    }

    create()
    {
        //start the game
        game.scene.start('loadingScene');
        

    }
}