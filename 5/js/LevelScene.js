class LevelScene extends Phaser.Scene {
    constructor()
    {
        super('levelScene');
    
    }

    create(){
        this.playingGame = true;
        this.cursor = this.input.keyboard.createCursorKeys();
        this.createBottomCollider();
        this.lives = 3;
        this.timeLimit = 15;

        this.background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        this.player = this.add.existing(new Player(this, this.cameras.main.width / 2, 550, 'defender'));
        this.velocity = 5;
        //physics group will make it easier to check for collisions
        this.falling_objects = this.physics.add.group();
        
        //we need to kill our falling_objects
        this.createCollisionDetection();

        //create stats
        this.stats_elements = [];
        this.createStats();

        //Create spawner
        this.spawner = new Spawner(this, this.falling_objects);
    }

    update() {
        if(this.playingGame){
            this.player.checkMovement();
        }
        
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
            if (falling_obj.constructor.name == 'Meteoroid') {
                this.loseLive();
            } else if (falling_obj.constructor.name == 'Ship') {
                this.updateScore(20);
            }
            falling_obj.kill();
        });

        //check collision between falling_bojects and bottom_collider
        this.physics.add.overlap(this.bottom_collider, this.falling_objects, (collider, falling_obj) => {
            if (falling_obj.constructor.name == 'Ship') {
                this.updateScore(-10);
            }
            falling_obj.kill()
        }, null);
    }

    createStats(){
        //create score text
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: '+this.score, { fontSize: '32px', fill: '#fff' });
        this.addStatsIndex(this.scoreText);

        //create time text
        
        this.timeText = this.add.text(400, 16, 'Time: ' + this.timeLimit, { fontSize: '32px', stroke: '#000', fill: '#8F3DF9' });
        this.timeText.setStroke("#de77ae", 8);
        this.addStatsIndex(this.timeText);
        //add event to decrease time
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

        
        //create an array that will hold our lives sprites
        this.lives_images = [];

        for (let i = 0; i < this.lives; i++) {
            //create this.lives number of images and store it in the lives_images array
            this.lives_images[i] = this.add.image(this.cameras.main.width - (this.lives - i) * 40, 32, 'life');
            this.addStatsIndex(this.lives_images[i]);
        }
    }

    onEvent() {
        this.timeLimit--;
        this.timeText.setText('Time: ' + this.timeLimit);
        if (this.timeLimit <= 0) {
            console.log("END");
            this.endGame();
        }
    }

    updateScore(value){
        this.score += value;
        this.scoreText.setText('Score: ' + this.score);
    }

    loseLive(){
        this.lives--;
        //get the image of index this.lives (since array is 0 based we get this way the last image)
        //and make it invisible
        this.lives_images[this.lives].visible = false;
        if (this.lives <= 0) {
            this.endGame()
            //finish the function (if there was anything further it will be ommited)
            return;
        }
    }

    addStatsIndex(object) {
        this.stats_elements.push(object);

    }

    keepStatsOnTop() {
        //loop through all the objects in our stats array
        this.stats_elements.forEach(element => {
            //bringToTop - brings this Game Object to the top of its parents display list
            this.children.bringToTop(element);
        });
    }


    endGame(){
        this.playingGame = false;
        this.time._active.forEach(element => {
            element.paused = true;
        });
        this.falling_objects.getChildren().forEach(element => {
            element.kill();
        });
    }
}