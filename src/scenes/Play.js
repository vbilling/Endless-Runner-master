class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){

        this.load.image('platform', './assets/platform.png');
        this.load.image('player', './assets/player.png');
        this.load.image('oceanfield', './assets/oceanfield.png');
        this.load.image('oceanfield2', './assets/oceanfield2.png');
        this.load.atlas('seahorse', './assets/seahorse.png', './assets/seahorse.json');
        this.load.atlas('jellyfish', './assets/jellyfishplatform.png', './assets/jellyfish.json');
        this.load.atlas('jellyfishPink', './assets/jellyfishPink.png', './assets/jellyfishPink.json');
        this.load.spritesheet('jellyfishGreen', './assets/jellyfishGreen.png', {frameWidth: 180, frameHeight: 180, startFrame: 0, endFrame: 7});
        this.load.spritesheet('jellyfishBlue', './assets/jellyfishBlue.png', {frameWidth: 180, frameHeight: 180, startFrame: 0, endFrame: 7});
        this.load.image('bubble', './assets/bubble.png');
        this.load.image('thoughtBubble', './assets/thoughtBubble.png');
        this.load.spritesheet('expressions', './assets/expressions.png', {frameWidth: 500, frameHeight: 375, startFrame: 0, endFrame: 7});


        this.load.spritesheet('seahorseJump', './assets/seahorsejump.png', {frameWidth: 74, frameHeight: 80, startFrame: 0, endFrame: 1});
        this.load.spritesheet('pinkPlatform', './assets/pinkPlatform.png', {frameWidth: 120, frameHeight: 120, startFrame: 0, endFrame: 1})


    }

    create(){
        
        //scrolling background
        this.oceanfield =  this.add.tileSprite(0,0, game.config.width, game.config.height, 'oceanfield').setOrigin(0,0);
        this.oceanfield2 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'oceanfield2').setOrigin(0,0);



        //new tutorial
        // creation of the physics group which will contain all platforms
        //this.platformGroup = this.physics.add.group();
        
        // ball sprite bound to an ARCADE body
        //this.horse = this.physics.add.sprite(game.config.width * game.settings.ballPosition, game.config.height * game.settings.groundPosition - game.settings.jumpForce, "seahorseJump");

        // adding the player (old tutorial)
        this.horse = new Seahorse(this,game.settings.playerStartPosition, game.config.height * 0.7, 'seahorseJump', 0);

        // set ball vertical gravity
        //this.horse.myArcadeBody.setGravityY = game.settings.playerGravity; //this.horse.body.gravity.y


        // set maximum restitution to the ball
        //this.horse.myArcadeBody.setBounce(1);


        // we will only check ball collision on its bottom side
        //this.horse.body.checkCollision.down = true;
        //this.horse.body.checkCollision.up = false;
        //this.horse.body.checkCollision.left = false;
        //this.horse.body.checkCollision.right = false;

        // make ball physics body a little narrower than its sprite
        //this.horse.setSize(30, 50, true);

        // first platform will be exactly under the ball
        //let platformX = this.horse.x;

        //from past tutorial
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

        
        this.jellyfish.addPlatform(game.config.width, game.config.width/2, game.config.height * game.settings.platformVerticalLimit[1] );

        this.jellyfish2 = new Jellyfish(this, this.platformPool, this.platformGroup, 'jellyfishGreen');
        
        this.jellyfish2.addPlatform(game.config.width, game.config.width/2, game.config.height * game.settings.platformVerticalLimit[1] );
        
        this.jellyfish3 = new Jellyfish(this, this.platformPool, this.platformGroup, 'jellyfishBlue');
        
        this.jellyfish3.addPlatform(game.config.width, game.config.width/2, game.config.height * game.settings.platformVerticalLimit[1] );



        //adding seahorse expression
        this.expression = this.add.sprite(5, 15, 'expressions').setOrigin(0);
        this.expression.setScale(0.27);
        
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNames('seahorse', {
                prefix: 'run', 
                start: 0, 
                end: 19, 
                first: 0, 
                zeroPad: 2}),
                frameRate: 10,
                repeat: -1
        });

        this.anims.create({
            key: 'horsejump',
            frames: this.anims.generateFrameNames('seahorseJump', {start: 1, end: 0, first: 0}),
            frameRate: 5
        });


        //this.horse.myArcadeBody.anims.play('move');


       
        //from old tutorial
        // setting collisions between the player and the platform group
        this.physics.add.collider(this.horse.myArcadeBody, this.platformGroup);

       
        //will eventually delete
        this.input.on("pointerdown", this.jump, this);

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
        this.instructions = this.add.text(30, 100, 'Hold SPACE to fall faster and increase your bounce', instructionsConfig).setOrigin(0);
        this.instructions.setAlpha(0);
        // initilize timer integer at 0 in create
        this.gametimer = 0;
        // write game timer text in update
        // initilize text that writes game timer
        this.bubble = this.add.sprite(540, 15, 'bubble').setOrigin(0);
        this.bubble.setScale(0.25);
        this.bubble.alpha = 0.87;
        this.timertext = this.add.text(564, 27, this.gametimer, gametimerConfig).setOrigin(0); //564

        this.pointer = this.input.activePointer;
        
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
        "I'll name you daddy jr and \n daddy jr jr, anddaddy jr jr \njr...",
        "Almost there baby!",
        "Oh god how am I going \nto pay for 1,000 college tuitions?!",
        "This is the happiest day of my life"
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

        console.log('original velocity', this.horse.myArcadeBody.body.velocity.y)



        
    }

    jump(){
        if(this.horse.myArcadeBody.body.touching.down || (this.horse.playerJumps > 0 && this.horse.playerJumps < game.settings.jumps)){
            
            if(this.horse.myArcadeBody.body.touching.down){
                this.horse.playerJumps = 0;  

            }

            this.horse.myArcadeBody.anims.play('horsejump');
            this.horse.myArcadeBody.setVelocityY(game.settings.jumpForce * -1);
            this.horse.playerJumps++;
            
        }


    }

    
    update(){
        //testing if space controls work
        //keep track of how long the space is held (will be used to decide how high you jump back up)
        if (this.horse.myArcadeBody.body.touching.down){
            //console.log('touching down');
            //will keep track of if you hit the platform
            this.platformhit = true;

        };
        if(keySpace.isDown){ //!this.horse.myArcadeBody.body.touching.down
            if(!this.horse.myArcadeBody.body.touching.down){
                this.downtime += 1;
                // console.log('downtime:', this.downtime);
                //console.log('platform hit?', this.platformhit);
                //the longer you hold it down, the higher you bounce
                if(this.downtime > 6 && !this.platformhit){
                    //only if the velocity is not too high
                    if (this.horse.myArcadeBody.body.velocity.y < 500){ 
                        this.horse.myArcadeBody.setVelocity(this.horse.myArcadeBody.body.velocity.y + this.downtime*1.5); //this.downtime*10 + 80
                        console.log('velocity ', this.horse.myArcadeBody.body.velocity.y);
                    }

                } 

            }
        }

        //if you are going up too fast
        if (this.horse.myArcadeBody.body.velocity.y < -500){
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
            this.scene.restart();
            this.scene.start('gameoverScene');
        };
        //make intruction text faded in then away afer a few seconds
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
        //console.log('player jumps ' + this.horse.playerJumps);
        this.oceanfield.tilePositionX += .5;
        this.oceanfield2.tilePositionX -= .5;


        this.horse.update();
        
        this.jellyfish.update();  
        
        this.gametimer += 1;
        this.timertext.text = Math.round(this.gametimer/60);
        function random(mn, mx) {
            return Math.round(Math.random() * (mx - mn) + mn);
        };
        // makeing a random phrase from the phrases array be choosen and appear after a few seconds 
        if(this.phrasestimer < 400) {
            this.phrasestimer += 1;
            //console.log('phrasestimer =', this.phrasestimer);
        }else{
            this.pick_phrase = random(0,this.phrases_array.length - 1);
            this.phrasetext.text = this.phrases_array[this.pick_phrase];
            console.log('expression frame:', this.pick_phrase);
            this.expression.setFrame(this.pick_phrase);
            this.phrasestimer = 0;
        };

    }

}

