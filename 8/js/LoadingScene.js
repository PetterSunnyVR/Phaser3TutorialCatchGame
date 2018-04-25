class LoadingScene extends Phaser.Scene {
    constructor()
    {
        
        super('loadingScene');
    }

    init(data) {
        this.levelData = data;
        console.log(this.levelData);
    }

    preload(){

        //set up boot info
        this.loadingBar = this.add.image(this.cameras.main.width/2,this.cameras.main.height/2,'loading_bar');
        this.loadingBar.x -= this.loadingBar.width/2;
        this.loadingBar.setOrigin(0,0);
        //on loading happening
        this.load.on('progress', function (value) {
            this.scene.loadingBar.scaleX = value;
        });

        //on loading complete
        this.load.on('complete', function () {
            let style = { font: "bold 32px Arial", fill: "#fff"};
            this.text_1 =this.scene.add.text( this.scene.loadingBar.x + this.scene.loadingBar.width/2, this.scene.loadingBar.y+this.scene.loadingBar.height,"Done loading!",style).setOrigin(0.5,0);
        });

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
    
        //loading sounds
        this.load.audio('background', [
            'assets/audio/background.ogg',
            'assets/audio/background.mp3'
        ]);
        this.load.audio('menuBackground', [
            'assets/audio/menuBackground.ogg',
            'assets/audio/menuBackground.mp3'
        ]);
        this.load.audio('meteoroidHit', [
            'assets/audio/meteoroidHit.ogg',
            'assets/audio/meteoroidHit.mp3'
        ]);
        this.load.audio('shipIntercepted', [
            'assets/audio/shipIntercepted.ogg',
            'assets/audio/shipIntercepted.mp3'
        ]);
        this.load.audio('shipLost', [
            'assets/audio/shipLost.ogg',
            'assets/audio/shipLost.mp3'
        ]);

        this.load.image('log_in','assets/sprites/log_in.png');
    }

    create(){
        
        console.log("Loading scene");
        console.log(this);
        game.scene.start('levelScene',this.levelData);
    }

    
}