class Instructions extends Phaser.Scene{
    constructor(){
        super("instructionScene");
    }

    preload(){
        this.load.image('instructions', './assets/instructions.png');
        this.load.spritesheet('seahorseJump', './assets/seahorsejump.png', {frameWidth: 74, frameHeight: 80, startFrame: 0, endFrame: 1});
        this.load.spritesheet('jellyfishGreen', './assets/jellyfishGreencopy.png', {frameWidth: 180, frameHeight: 180, startFrame: 0, endFrame: 1});
        this.load.image('littleBubble', './assets/littleBubble.png');
        this.load.audio('menuSong', './assets/Daddy_Seahorse_Title_Screen.wav');

    }
    create(){

        this.menuSong = this.sound.add('menuSong');
        this.menuSong.play();
        this.menuSong.loop = true;

        this.background = this.add.tileSprite(0,0, game.config.width, game.config.height,'instructions').setOrigin(0,0);

        this.jellyfish = this.physics.add.sprite(game.config.width/2 - 100, game.config.height * 0.7, 'jellyfishGreen').setOrigin(0);
        this.testhorse = this.physics.add.sprite(game.config.width/2 - 70, 100, 'seahorseJump').setOrigin(0);
        this.testhorse.setGravityY(game.settings.playerGravity);
        this.jellyfish.setImmovable(true);
        this.jellyfish.setSize(100, 80);
        

        this.physics.add.collider(this.testhorse, this.jellyfish);

        this.testhorse.setBounce(0.9);

        let infoConfig = {
            fontFamily: 'Chalkduster',
            fontSize: '30px',
            color: 'white',
            align: 'center',
            stroke: '#415392', //#526aba
            strokeThickness: 3,
            padding: {
                top: 5,
                bottom: 4
            },
            //fixedWidth: 100
        };

       this.add.text(game.config.width/2 + 15, game.config.height/2 - 50,'Press Space to fall faster\n and increase your bounce power', infoConfig).setOrigin(0.5);

        infoConfig.fontSize = '15px';

        this.add.text(game.config.width/2, game.config.height/2, 'Press ← to continue',infoConfig).setOrigin(0.5);

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        keyLEFT  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    }

    update(){

        if (this.testhorse.body.touching.down){
            //console.log('touching down');
            //will keep track of if you hit the platform
            this.platformhit = true;

        }

        if(keySpace.isDown){ 
            if(!this.testhorse.body.touching.down){
                this.downtime += 1;
                //the longer you hold it down, the higher you bounce
                if(this.downtime > 6 && !this.platformhit){
                    //only if the velocity is not too high
                    if (this.testhorse.body.velocity.y < 500){ 
                        this.testhorse.setVelocityY(this.testhorse.body.velocity.y + this.downtime*1.5); //this.downtime*10 + 80
                    }

                } 

            }
        }

        //if you are going up too fast
        if (this.testhorse.body.velocity.y < -600){
            this.testhorse.setVelocityY(this.testhorse.body.velocity.y + 200);

        }

        
        if(keySpace.isUp){
            //variable for how long it was down is set back to 0
            this.downtime = 0;
            this.platformhit = false;
            //this.horse.myArcadeBody.setBounce(1);
            
        }
         if(Phaser.Input.Keyboard.JustDown(keyLEFT) ){
             this.menuSong.stop();
            this.scene.start('playScene');
         }
        
    }
}