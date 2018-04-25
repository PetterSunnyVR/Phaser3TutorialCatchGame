class LoadingScene extends Phaser.Scene {
    constructor()
    {
        
        super('loadingScene');
    }

    preload(){
        //this.load.image('background','assets/sprites/background.png');
        this.load.image('defender','assets/sprites/defender.png');
        this.load.image('ship','assets/sprites/ship.png');
        this.load.image('meteoroid','assets/sprites/meteoroid.png');
        
        this.load.image('life','assets/sprites/coins_study.png');

        this.load.image('logo','assets/sprites/logo.png');
        this.load.image('end_logo','assets/sprites/end_logo.png');
        this.load.image('button_start','assets/sprites/button_start.png');
        this.load.image('button_restart','assets/sprites/button_restart.png');

        this.load.spritesheet('spaceShip', 'assets/sprites/SpritesheetspaceShip.png',{ frameWidth: 311, frameHeight: 696 });
        for(let i = 1; i<9; i++){
            this.load.image('meteoroid'+i,'assets/sprites/meteoroid'+i+'.png');
        }
        this.load.image('backgroundStars','assets/sprites/backgroundStars.png');
        this.load.spritesheet('shipPortal','assets/sprites/playerPortal.png',{ frameWidth: 99, frameHeight: 19 });
    }

    create(){
        
        console.log("Loading scene");
        console.log(this);
        game.scene.start('levelScene');
    }
}