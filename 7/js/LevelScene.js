class LevelScene extends Phaser.Scene {
    constructor()
    {
        super('levelScene');
    
    }

    create(){
        this.cursor = this.input.keyboard.createCursorKeys();
        this.background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundStars');
        
        this.timeLimit = 5;
        this.lives = 3;
        this.prepareAnimations();
        this.createSounds();
        this.createStartMenu();
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
                this.meteorCrashSound.play();
            } else if (falling_obj.constructor.name == 'Ship') {
                this.updateScore(20);
                this.shipInterceptedSound.play();
            }
            falling_obj.kill();
        });

        //check collision between falling_bojects and bottom_collider
        this.physics.add.overlap(this.bottom_collider, this.falling_objects, (collider, falling_obj) => {
            if (falling_obj.constructor.name == 'Ship') {
                this.updateScore(-10);
                this.shipCrashSound.play();
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
            this.createEndMenu();
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
            this.createEndMenu();
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

    createStartMenu() {
        //we will store each new menu element in here so we can easily remove them
        this.menuGroup = [];
        this.menuMusic.play();
        //add logo image to the scene
        this.logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'logo');
        //GameObjectFactory
        console.log(this.add);
        this.menuGroup.push(this.logo);

        //we add a start button as image
        this.button = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + this.logo.height / 2 + 30, 'button_start');
        //we set the image as interactive
        this.button.setInteractive();
        this.menuGroup.push(this.button);

        //we use a pointerdown down to invoke desired functionality
        this.button.on('pointerdown', () => {
                this.menuMusic.stop();    
                this.startGame();
                this.menuGroup.forEach(element => {
                    element.destroy();
                });
                this.playingGame = true;
        });
        
    }

    startGame(){
        this.backgroundMusic.play();
        this.createBottomCollider();
        this.player = this.add.existing(new Player(this, this.cameras.main.width / 2, 550, 'shipPortal'));

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

    createEndMenu(){
        this.endGame();
        this.backgroundMusic.stop();
        this.menuMusic.play();

        //we will cover everything with background as a fast way to have a clear screen
        this.children.bringToTop(this.background);

        //create a end screen that will hold your score
        this.logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'end_logo');

        //create a restart button
        this.button = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + this.logo.height / 2 + 30, 'button_restart');
        this.button.setInteractive();

        //because we have a specyfic place on the end logo asset 
        //we will set the score text to be aligned with it
        this.endScore = this.add.text(this.cameras.main.width / 2 + 10, this.cameras.main.height / 2 + this.logo.height / 4 - 20, this.score, { fontSize: '26px', fill: '#000' });
        
        //on restart button pressed we simply restart our LevelScene
        this.button.on('pointerdown', () => {
            this.menuMusic.stop();
            this.scene.start('levelScene');
        });
    }

    prepareAnimations(){
        //prints the AnimationManager
        console.log(this.anims);
        //ship animation
        this.anims.create({key:'shipFly',frames: this.anims.generateFrameNumbers('spaceShip', {start: 0, end: 5 }), frameRate: 24, repeat: -1});
        //since meteoroid is not a spritesheet but couple of separate sprites
        //we create an array which holds all the keys
        let framesArray = [];
        for(let i=1; i<9; i++){
            framesArray.push({key: "meteoroid"+i});
        }
        //we use the array to tell the animation object to creat animation from those keys
        this.anims.create({key:'meteoroidRotate',frames: framesArray, frameRate: 7, repeat: -1});
        //create animation for the player
        this.anims.create({key: 'portalStuff',frames: this.anims.generateFrameNumbers('shipPortal',{start: 0, end:3}),frameRate: 4, repeat: -1});
    }

    createSounds(){
        //WebAudioSoundManager
        console.log(this.sound);
        this.menuMusic = this.sound.add('menuBackground');
        this.menuMusic.loop = true;
        this.menuMusic.volume = 0.1;

        this.backgroundMusic = this.sound.add('background');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.2;

        this.shipCrashSound = this.sound.add('shipLost');
        this.shipCrashSound.volume = 0.8;
        this.shipInterceptedSound = this.sound.add('shipIntercepted');
        this.shipInterceptedSound.volume = 0.8;

        this.meteorCrashSound = this.sound.add('meteoroidHit');
        this.meteorCrashSound.volume = 0.8;

        
    }
}