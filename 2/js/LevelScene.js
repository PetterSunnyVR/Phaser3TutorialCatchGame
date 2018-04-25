class LevelScene extends Phaser.Scene {
    constructor()
    {
        super('levelScene');
    
    }

    create(){
        console.log("LevelScene");
        this.cursor = this.input.keyboard.createCursorKeys();
        this.background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        this.player = this.add.existing(new Player(this, this.cameras.main.width / 2, 550, 'defender'));
        this.velocity = 5;
    }

    update() {
        this.player.checkMovement();
    }
}