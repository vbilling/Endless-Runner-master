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
        this.load.image('bubble', './assets/bubble.png');
        this.load.image('thoughtBubble', './assets/thoughtBubble.png');
        this.load.spritesheet('expressions', './assets/expressions.png', {frameWidth: 500, frameHeight: 375, startFrame: 0, endFrame: 1});


        this.load.spritesheet('seahorseJump', './assets/seahorsejump.png', {frameWidth: 74, frameHeight: 80, startFrame: 0, endFrame: 1});


    }

    create(){


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
        this.jellyfish = new Jellyfish(this, this.platformPool, this.platformGroup, 'jellyfishPink');
        
        this.jellyfish.addPlatform(game.config.width, game.config.width/2, game.config.height * game.settings.platformVerticalLimit[1] );

        // adding the player;
        this.horse = new Seahorse(this,game.settings.playerStartPosition, game.config.height * 0.7, 'seahorseJump', 0);

        //adding seahorse expression
        this.expression = this.add.sprite(10, 15, 'expressions').setOrigin(0);
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

        //this.anims.create({
            //key: 'jam', 
            //frames: this.anims.generateFrameNames('pinkJellyfish', {
                //prefix: 'jellyfish', 
                //start: 0, 
                //end: 6,
                //first: 0, 
                //zeroPad: 1}), 
                //frameRate: 15, 
                //repeat: -1
        //});

        //this.jellyfish.play('jam');
       
        // setting collisions between the player and the platform group
        this.physics.add.collider(this.horse.myArcadeBody, this.platformGroup);

       

        this.input.on("pointerdown", this.jump, this);
        //this.horse.myArcadeBody.setBounceY(1);

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
            fixedWidth: 100
        };
        let phrasesConfig = {
            fontFamily: 'Chalkduster',
            fontSize: '15px',
            color: 'black',
            align: 'center',
            //stroke: '#415392', //#526aba
            //strokeThickness: 3,
            padding: {
                top: 5,
                bottom: 4
            },
        };
        // initilize timer integer at 0 in create
        this.gametimer = 0;
        // write game timer text in update
        // initilize text that writes game timer
        this.bubble = this.add.sprite(540, 15, 'bubble').setOrigin(0);
        this.bubble.setScale(0.25);
        this.bubble.alpha = 0.87;
        this.timertext = this.add.text(537, 27, this.gametimer, gametimerConfig);

        this.pointer = this.input.activePointer;
        
        //thought bubble
        this.thoughtBubble = this.add.sprite(110, 5, 'thoughtBubble').setOrigin(0, 0);
        //creating the seahorse's thoughts while you play
        this.phrases_array = ["I'm going to be a father", "Better Hurry", "AHHHH"]
        this.phrasestimer = 0;
        this.phrasetext = this.add.text(this.thoughtBubble.x + 55, this.thoughtBubble.y + 25, this.phrases_array[0], phrasesConfig);
        
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
        //game over
        if(this.horse.myArcadeBody.y > game.config.height){
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
        if(this.phrasestimer < 300) {
            this.phrasestimer += 1;
            //console.log('phrasestimer =', this.phrasestimer);
        }else{
            this.pick_phrase = random(0,2);
            this.phrasetext.text = this.phrases_array[this.pick_phrase];
            this.phrasestimer = 0;
        };



    }

}

