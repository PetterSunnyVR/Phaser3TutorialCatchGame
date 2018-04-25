class BootScene extends Phaser.Scene {
    constructor()
    {
        super('bootScene');
    
    }

    preload()
    {
        //level file (here if you want to set up loading sprites from json)
        this.load.json('levelData','assets/levels/level.json');
        this.load.image('loading_bar','assets/sprites/loading_bar.png');
        
    }

    create()
    {
        //we load the json data to js object
        this.levelData = this.cache.json.get("levelData");
        //custom variable
        game.level = 1;
        //start the game
        game.scene.start('loadingScene', this.levelData);
        

    }
}