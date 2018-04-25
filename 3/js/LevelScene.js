class LevelScene extends Phaser.Scene {
    constructor()
    {
        super('levelScene');
    
    }

    create(){
        console.log("LevelScene");
        this.cursor = this.input.keyboard.createCursorKeys();
        this.createBottomCollider();

        this.background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        this.player = this.add.existing(new Player(this, this.cameras.main.width / 2, 550, 'defender'));
        this.velocity = 5;
        //physics group will make it easier to check for collisions
        this.falling_objects = this.physics.add.group();
        //adding sprites to our scene
        this.meteoroid = this.add.existing(new Meteoroid(this, this.cameras.main.width / 2, -30, 'meteoroid'));
        this.ship = this.add.existing(new Ship(this, 200, -30, 'ship'));
        //adding sprites to physic group
        this.falling_objects.add(this.meteoroid);
        this.falling_objects.add(this.ship);

        
        //we need to kill our falling_objects
        this.createCollisionDetection();
    }

    update() {
        this.player.checkMovement();
    }

    createBottomCollider(){
        //create a bottom collider
        this.bottom_collider = new Phaser.Physics.Arcade.Sprite(this, -0.2 * this.cameras.main.width, this.cameras.main.height).setOrigin(0, 0);
        this.add.existing(this.bottom_collider);
        this.physics.add.existing(this.bottom_collider, true);
        this.bottom_collider.body.width = 1.5 * this.cameras.main.width;
    }

    createCollisionDetection(){
        //we use overlap, because collide would move the player downwards
        this.physics.add.collider(this.player, this.falling_objects, (player, falling_obj) => {
            falling_obj.kill();
        });

        //check collision between falling_bojects and bottom_collider
        this.physics.add.overlap(this.bottom_collider, this.falling_objects, (collider, falling_obj) => {
            falling_obj.kill()
        }, null);
    }
}