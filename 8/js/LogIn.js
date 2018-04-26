class LogInInput extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key_texture, frame) {
        super(scene, x, y, key_texture, frame);
        this.scene = scene;
        this.inpuActive = false;
        this.setInteractive();
        //add text object to our scene
        this.player_input_text = this.scene.add.text(this.x - this.width / 2 + 10, this.y - this.height / 2 + 7, "", { fontSize: '30px', fill: '#000' });
        this.scene.menuGroup.push(this.player_input_text);
        //add the textfield to he menuGroup
        //add functionality on click
        this.on('pointerdown', (pointer) => {
            //if we click on the input field it will become active
            if (!this.inpuActive) {
                //read keys from keyboard (only lower, upper letters and numbers)
                this.scene.input.keyboard.on('keydown', (event) => {
                    if (((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123))
                        && this.player_input_text.text.length < 11) {
                        this.player_input_text.setText(this.player_input_text.text + event.key);
                    }
              
                    if (event.keyCode == 8) {
                        if (this.player_input_text.text.length > 0) {
                            this.player_input_text.setText(this.player_input_text.text.slice(0, -1));
                        }

                    }
                });
                this.inpuActive = true;
            }
            console.log("active");
            //change tint to yellow to indicate that we are in input text mode 
            this.setTint(0xffffcc);

        });
        
        //add this to the scene
        this.scene.add.existing(this);
        //bring it to the top of the scene display list
        this.getTextToTop();

    }

    //additional methods to read and write text to the text field
    getText() {
        return this.player_input_text.text;
    }

    setText(text) {
        this.player_input_text.setText(text);
    }

    getTextToTop() {
        //bring text to top
        this.scene.children.bringToTop(this.player_input_text);
    }

    kill() {
        this.disableBody(true, true);
    }


}