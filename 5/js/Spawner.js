class Spawner extends Phaser.GameObjects.GameObject{
    constructor(scene,spawn_group){
        super(scene,"Spawner");
        this.scene = scene;
        //goupd to keep all the objects to be reused
        this.spawn_group = spawn_group;
        //how many objects can be spawned at the same time
        this.spawn_object_limit = 2;
        //group size limit
        this.spawn_group_limit = 10;
        //just to be sure we limit the number of meteors - because 
        //there is a chance that wi will get only meteors
        this.meteor_limit = Math.round( this.spawn_group_limit*0.6);
        //count the meteors to check if we should stop creating new meteors
        //in our group
        this.meteor_count = 0;
        //sprite names that we will use
        this.spriteKeysArray = ['meteoroid', 'ship'];
        //how often we will spawn new falling objects
        this.spawn_time_min = 1;
        this.spawn_time_max = 2;
        //start spawning
        this.random_time = Phaser.Math.RND.realInRange(this.spawn_time_min,this.spawn_time_max)*1000;
        this.spawn_event = this.scene.time.addEvent({delay: this.random_time, callback: this.spawnCallback, callbackScope: this, loop: false});
        
    }

    spawnCallback(){
        //randomly select how many objects will be spawned
        let randomObjectNumber = Phaser.Math.RND.between(1,this.spawn_object_limit);
        //loop throught all the objects to be spawned and choose what sprite will it be
        for( let i = 0; i< randomObjectNumber; i++){
            //try to get a disabled object from our group
            let falling_obj = this.spawn_group.getFirstDead();
            //randomly choose a sprite key
            let randomIndex = Phaser.Math.RND.between(0,this.spriteKeysArray.length-1);
            //spawn second sprite higher so they won't be overlaping each other during the spawn
            let y = - 30-i*80;
            //randomly select the x position
            let x = Phaser.Math.RND.between(50,750);
            //check if we need to create a new object or can we reuse an old one
            if(!falling_obj || this.spawn_group.children.size < this.spawn_group_limit){
                //create new objects at the beginning untill we reach the group limit
                if(this.spriteKeysArray[randomIndex]=='meteoroid' && this.meteor_count<this.meteor_limit){
                    //create a meteoroid until we reach the desired limit
                    falling_obj = new Meteoroid(this.scene,x,y,this.spriteKeysArray[randomIndex]);
                    this.meteor_count++;
                }
                else if (this.spriteKeysArray[randomIndex]=='ship' || this.meteor_count>=this.meteor_limit)
                {
                    //if ship sprite was selected create a ship
                    //there is a chace that we will have all the elements as ships
                    //this can be a feature or we can create another limit and
                    //choose to create a meteoroid instead
                    falling_obj = new Ship(this.scene,x,y,this.spriteKeysArray[randomIndex]);
                }
            }else{
                //if the group limit was reached we simply reuse first dead object
                falling_obj.enableBody(true,x,y,true,true);
            }
            //add object to the group
            this.scene.falling_objects.add(falling_obj);
            this.scene.keepStatsOnTop();
            
        }
        //if the game is still on set another event
        if(this.scene.playingGame){
            this.random_time = Phaser.Math.RND.between(this.spawn_time_min,this.spawn_time_max)*1000;
            this.spawn_event = this.scene.time.addEvent({delay: this.random_time, callback: this.spawnCallback, callbackScope: this, loop: false});
        }
    }
}