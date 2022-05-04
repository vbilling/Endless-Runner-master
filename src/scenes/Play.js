class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){

        this.load.image('oceanfield', './assets/oceanfield.png');
        this.load.image('oceanfield2', './assets/oceanfield2.png');
        this.load.spritesheet('jellyfishPink', './assets/jellyfishPink.png', {frameWidth: 180, frameHeight: 180, startFrame: 0, endFrame: 1});
        this.load.spritesheet('jellyfishGreen', './assets/jellyfishGreencopy.png', {frameWidth: 180, frameHeight: 180, startFrame: 0, endFrame: 1});
        this.load.spritesheet('jellyfishBlue', './assets/jellyfishBlue.png', {frameWidth: 180, frameHeight: 180, startFrame: 0, endFrame: 1});
        this.load.image('bubble', './assets/bubble.png');
        this.load.image('thoughtBubble', './assets/thoughtBubble.png');
        this.load.spritesheet('expressions', './assets/expressions.png', {frameWidth: 500, frameHeight: 375, startFrame: 0, endFrame: 7});
        this.load.spritesheet('jellyfishOrange', './assets/jellyfishOrange.png', {frameWidth: 180, frameHeight: 180, startFrame: 0, endFrame: 1});
        this.load.image('collectables', '/assets/collectable.png');


        this.load.spritesheet('seahorseJump', './assets/seahorsejump.png', {frameWidth: 74, frameHeight: 80, startFrame: 0, endFrame: 1});
        this.load.spritesheet('pinkPlatform', './assets/pinkPlatform.png', {frameWidth: 120, frameHeight: 120, startFrame: 0, endFrame: 1})

        this.load.image('littleBubble', './assets/littleBubble.png'); //or bubble2
        this.load.atlas('seahorserun', './assets/seahorserun.png', './assets/seahorserun.json'); //the correct run animation

        this.load.audio('runJam', './assets/Jellyfish_Run_1.wav');
        this.load.audio('bounce', './assets/jellyfish_sounds_6.mp3');


    }

    create(){

        this.jam = this.sound.add('runJam');
        this.bouncing = this.sound.add('bounce');
        this.jam.play();
        this.jam.loop = true;

        //will keep track if its your first time playing so the instructions are displayed
        tutorial += 1;
        
        //scrolling background
        this.oceanfield =  this.add.tileSprite(0,0, game.config.width, game.config.height, 'oceanfield').setOrigin(0,0);
        this.oceanfield2 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'oceanfield2').setOrigin(0,0);
        

        // group with all active platforms.
        this.platformGroup = this.add.group({ 
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }

        });
 
        // pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }

        });

        //add platform instances
        this.jellyfish = new Jellyfish(this, this.platformPool, this.platformGroup, 'jellyfishPink'); //or switch to pinkPlatform for smaller one

        
        this.jellyfish.addPlatform(game.config.width/2, game.config.height * game.settings.platformVerticalLimit[1] );

        this.jellyfish2 = new Jellyfish(this, this.platformPool, this.platformGroup, 'jellyfishGreen');
        
        this.jellyfish2.addPlatform(game.config.width/2, game.config.height * game.settings.platformVerticalLimit[1] );
        
        this.jellyfish3 = new Jellyfish(this, this.platformPool, this.platformGroup, 'jellyfishBlue');
        
        this.jellyfish3.addPlatform(game.config.width/2, game.config.height * game.settings.platformVerticalLimit[1] );

        this.jellyfish4 = new Jellyfish(this, this.platformPool, this.platformGroup, 'jellyfishOrange');
        
        this.jellyfish4.addPlatform(game.config.width/2, game.config.height * game.settings.platformVerticalLimit[1] );

        

        //bubble trail
        //myParticleSystem = myParticleManager.createEmitter
        this.bubbles = this.add.particles('littleBubble');
        this.makebubble = this.bubbles.createEmitter({ 
            x: 50,
            y: 50,
            //speed: 1000,
            lifespan: { min: 50, max: 6000},
            angle: 180,
            speed: { min: 50, max: 100},
            gravityY: -20,
            gravityX: -10,
            frequency: 0.2,
            quantity: 0.01,
            scale: { start: 0.1, end: 0.3 },
            //follow: this.horse.myArcadeBody,
        });
        // adding the player 
        this.horse = new Seahorse(this,game.settings.playerStartPosition, game.config.height * 0.7, 'seahorserun', 0);

        this.makebubble.startFollow(this.horse.myArcadeBody);


        //adding seahorse expression
        this.expression = this.add.sprite(5, 15, 'expressions').setOrigin(0);
        this.expression.setScale(0.27);


       // console.log('seahorse run:', )
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNames('seahorserun', {
                prefix: 'run', 
                //start: 0, 
                end: 8, 
                //first: 0, 
                zeroPad: 2}),
                frameRate: 12,
                repeat: -1
        });
        this.horse.myArcadeBody.anims.play('move');

       
        //from old tutorial
        // setting collisions between the player and the platform group
        this.physics.add.collider(this.horse.myArcadeBody, this.platformGroup);

        //game over
        this.gameover = false;
        //timer
        let gametimerConfig = {
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
        let phrasesConfig = {
            fontFamily: 'Chalkduster',
            fontSize: '12px',
            color: 'black',
            align: 'center',
            //stroke: '#415392', //#526aba
            //strokeThickness: 3,
            padding: {
                top: 5,
                bottom: 4
            },
        };
        let instructionsConfig = {
            fontFamily: 'Chalkduster',
            fontSize: '16px',
            color: 'white',
            align: 'center',
            stroke: 'black', //#526aba
            strokeThickness: 3,
            padding: {
                top: 5,
                bottom: 4
            },

        }
        
        //instructions text
        if(tutorial < 7 ){ 
            this.instructions = this.add.text(30, 100, 'Hold SPACE to fall faster and increase your bounce', instructionsConfig).setOrigin(0);
            this.instructions.setAlpha(0);
        };
        // initilize timer integer at 0 in create
        this.gametimer = 0;
        // write game timer text in update
        // initilize text that writes game timer
        this.bubble = this.add.sprite(540, 15, 'bubble').setOrigin(0);
        this.bubble.setScale(0.25);
        this.bubble.alpha = 0.87;
        this.timertext = this.add.text(564, 27, this.gametimer, gametimerConfig).setOrigin(0); //564

        //this.pointer = this.input.activePointer;
        
        //thought bubble
        this.thoughtBubble = this.add.sprite(110, 5, 'thoughtBubble').setOrigin(0, 0);
        //creating the seahorse's thoughts while you play
        this.phrases_array = ["I'm going to be a father", 
        "Better Hurry", 
        "AHHHHHHHHHHHHHHHHHHHHH", 
        "Wheres a clambulence\nwhen you need one?!",
        "So many jellyfish but\nno peanut butter.",
        "What a great tune-a!",
        "Oh god the dad jokes\n are starting already.",
        "At least we're getting\n plenty vitamin SEA.",
        "I'm scalloping as fast\n as I can!",
        "If 3 is triplets, what\n is 1,000?",
        "Outta the way Daddy's \n coming!",
        "I'll name you daddy jr and \ndaddy jr jr...",
        "Almost there baby!",
        "Oh god how am I going to\n pay for 1,000 college tuitions?!",
        "This is the happiest day of \nmy life"
        ]
        this.phrasestimer = 0;
        this.phrasetext = this.add.text(this.thoughtBubble.x + 55, this.thoughtBubble.y + 15, this.phrases_array[0], phrasesConfig);

        //trying to get seahorse to fall faster when mouse held down
        //this.input.on("pointerdown", this.myArcadeBody.setGravityY += 100, this);

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //will keep track of how long down is pressed (code is in update())
        this.downtime = 0;
        //keeps track of if you hit the platform so that space does not make you keep going down
        this.platformhit = false;

        //console.log('original velocity', this.horse.myArcadeBody.body.velocity.y)







        
    }

    update(){
        //making the game get progressivly harder
        if(Math.round(this.gametimer/60) == 0){
            game.settings.platformSizeRange =[1,1];
            game.settings.platformVerticalLimit = [0.9,0.9]
        };
        if(Math.round(this.gametimer/60) < 5){
            game.settings.platformSizeRange =[1,1];
            game.settings.platformVerticalLimit = [0.9,0.9]
        };
        if(Math.round(this.gametimer/60) > 5){ 
            game.settings.platformSizeRange =[30, 60]; 
            game.settings.platformVerticalLimit = [0.4,0.9];
        };
        if(Math.round(this.gametimer/60) > 8 ){ 
            game.settings.platformSizeRange =[50, 100]; 
            game.settings.platformVerticalLimit = [0.5 ,0.9]; 
            game.settings.spawnRange = [20, 200]; 
        };

        //testing if space controls work
        //keep track of how long the space is held (will be used to decide how high you jump back up)
        if (this.horse.myArcadeBody.body.touching.down){
            //console.log('touching down');
            //will keep track of if you hit the platform
            this.bouncing.play();
            this.platformhit = true;

        }

        if(keySpace.isDown){ 
            if(!this.horse.myArcadeBody.body.touching.down){
                this.downtime += 1;
                //the longer you hold it down, the higher you bounce
                if(this.downtime > 6 && !this.platformhit){
                    //only if the velocity is not too high
                    if (this.horse.myArcadeBody.body.velocity.y < 500){ 
                        this.horse.myArcadeBody.setVelocity(this.horse.myArcadeBody.body.velocity.y + this.downtime*1.5); //this.downtime*10 + 80
                    }

                } 

            }
        }

        //if you are going up too fast
        if (this.horse.myArcadeBody.body.velocity.y < -600){
            this.horse.myArcadeBody.setVelocity(this.horse.myArcadeBody.body.velocity.y + 200);

        }

        
        if(keySpace.isUp){
            //variable for how long it was down is set back to 0
            this.downtime = 0;
            this.platformhit = false;
            //this.horse.myArcadeBody.setBounce(1);
            
        }
        //game over
        if(this.horse.myArcadeBody.y > game.config.height){ //if(this.horse.myArcadeBody.y > game.config.height){ or just .y
            this.gameover = true;
        }

        //game over
        if(this.gameover == true){
            //cheking if your high score is higher than your last high score


            if(Math.round(this.gametimer/60) > highscore){
                highscore = Math.round(this.gametimer/60);
                //console.log('final highscore:', highscore);
            };
            this.jam.stop();
            this.scene.start('gameoverScene');
        };
        //make intruction text faded in then away afer a few seconds
        
        if(tutorial < 7){
            if (this.gametimer/60 > 0){
                this.instructions.setAlpha(0.4);
            };
            if (this.gametimer/60 > 0.1){
                this.instructions.setAlpha(0.8);
            };
            if (this.gametimer/60 > 0.2){
                this.instructions.setAlpha(1);
            };
        
            if (Math.round(this.gametimer/60) > 4){
                this.instructions.setAlpha(0);
            };
        };   
        //console.log('player jumps ' + this.horse.playerJumps);
        this.oceanfield.tilePositionX += .5;
        this.oceanfield2.tilePositionX -= .5;


        this.horse.update();
        
        this.jellyfish.update();  
        this.jellyfish2.update(); 
        this.jellyfish3.update(); 
        this.jellyfish4.update(); 


        
        this.gametimer += 1;
        this.timertext.text = Math.round(this.gametimer/60);
        function random(mn, mx) {
            return Math.round(Math.random() * (mx - mn) + mn);
        };
        // makeing a random phrase from the phrases array be choosen and appear after a few seconds 
        if(this.phrasestimer < 400) {
            this.phrasestimer += 1;
        }else{
            this.pick_phrase = random(0,this.phrases_array.length - 1);
            this.phrasetext.text = this.phrases_array[this.pick_phrase];
            this.expression.setFrame(this.pick_phrase);
            this.phrasestimer = 0;
        };

    }

}

