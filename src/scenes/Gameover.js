class Gameover extends Phaser.Scene{
    constructor(){
        super("gameoverScene");
    }
    preload(){
        this.load.image('deathScreen', './assets/deathScreen.png');
        this.load.spritesheet('jellyfishGreendeath', './assets/jellyfishGreen.png', {frameWidth: 180, frameHeight: 180, startFrame: 0, endFrame: 7});
        this.load.image('deadSeahorse', './assets/deadSeahorse.png');
        this.load.image('tear', './assets/tear.png');
        this.load.audio('end', './assets/Jellyfish_Ending.wav');

    }
    create(){

        this.end = this.sound.add('end');
        this.end.play();
        this.end.loop = true;

        this.deathScreen = this.add.tileSprite(0, 0, 640, 480, 'deathScreen').setOrigin(0, 0);
        this.jellyfishGreen1 = this.add.sprite(30, 45, 'jellyfishGreendeath').setOrigin(0);
        this.jellyfishGreen2 = this.add.sprite(230, 10, 'jellyfishGreendeath').setOrigin(0);
        this.jellyfishGreen3 = this.add.sprite(430, 45, 'jellyfishGreendeath').setOrigin(0);
        this.deadSeahorse = this.add.sprite(200, 290, 'deadSeahorse').setOrigin(0);

        //jellyfish tears
        var tears1 = this.add.particles('tear');
        tears1.createEmitter({
            x: this.jellyfishGreen1.x+53, //83
            y: this.jellyfishGreen1.y+90,
            lifespan: 2000,
            speed: { min: 20, max: 50},
            angle: 90,
            gravityY: 160, //170
            scale: { start: 0.7, end: 0 }, //0.4, 0
            quantity: 0.1, //0.2
            blendMode: 'ADD'
        });
        var tears2 = this.add.particles('tear');
        tears2.createEmitter({
            x: this.jellyfishGreen1.x+117, //147 
            y: this.jellyfishGreen1.y+90,
            lifespan: 2000,
            speed: { min: 20, max: 50},
            angle: 90,
            gravityY: 170,
            scale: { start: 0.7, end: 0 }, //0.4, 0
            quantity: 0.1,
            blendMode: 'ADD'
        });
        var tears3 = this.add.particles('tear');
        tears3.createEmitter({
            x: this.jellyfishGreen1.x+253, 
            y: 100,
            lifespan: 2000,
            speed: { min: 20, max: 50},
            angle: 90,
            gravityY: 170,
            scale: { start: 0.7, end: 0 }, //0.4, 0
            quantity: 0.1,
            blendMode: 'ADD'
        });
        var tears4 = this.add.particles('tear');
        tears4.createEmitter({
            x: 347, 
            y: 105,
            lifespan: 2000,
            speed: { min: 20, max: 50},
            angle: 90,
            gravityY: 170,
            scale: { start: 0.7, end: 0 }, //0.4, 0
            quantity: 0.1,
            blendMode: 'ADD'
        });
        var tears5 = this.add.particles('tear');
        tears5.createEmitter({
            //frame: 'blue',
            x: 482, 
            y: 135,
            lifespan: 2000,
            speed: { min: 20, max: 50},
            angle: 90,
            gravityY: 170,
            scale: { start: 0.7, end: 0 }, //0.4, 0
            quantity: 0.1,
            blendMode: 'ADD'
        });
        var tears6 = this.add.particles('tear');
        tears6.createEmitter({
            x: 547, 
            y: 135,
            lifespan: 2000,
            speed: { min: 20, max: 50},
            angle: 90,
            gravityY: 170,
            scale: { start: 0.7, end: 0 }, //0.4, 0
            quantity: 0.1,
            blendMode: 'ADD'
        });
        
        this.anims.create({
            key: 'swim1',
            frames: this.anims.generateFrameNames('jellyfishGreendeath', {start: 0, end: 7, first: 0}),
                frameRate: 7,
                repeat: -1
        });
        this.anims.create({
            key: 'swim2',
            frames: this.anims.generateFrameNames('jellyfishGreendeath', {start: 1, end: 7, first: 0}),
                frameRate: 7,
                repeat: -1
        });

        this.jellyfishGreen1.anims.play('swim1');
        this.jellyfishGreen2.anims.play('swim2');
        this.jellyfishGreen3.anims.play('swim1');


        let gameoverConfig = {
            fontFamily: 'Phosphate',
            fontSize: '70px',
            color: '#344df7',
            align: 'center',
            stroke: 'white', //#526aba
            strokeThickness: 5,
            padding: {
                top: 5,
                bottom: 4
            }
        };
        let instructionsConfig = {
            fontFamily: 'Copperplate',
            fontSize: '26px',
            color: 'white',
            align: 'center',
            stroke: 'black', //#526aba
            strokeThickness: 3,
            padding: {
                top: 5,
                bottom: 4
            }
        };

        let highscoreConfig = {
            fontFamily: 'Brush Script MT',
            fontSize: '35px',
            color: 'white', //#fff8ab
            align: 'center',
            stroke: 'black', //#526aba
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 4
            }
        };

        this.scoretext = this.add.text(250, 140, 'High Score:', highscoreConfig).setOrigin(0);

        this.add.text(this.scoretext.x + 150, this.scoretext.y, highscore, highscoreConfig).setOrigin(0);
        this.add.text(140, 190, 'GAME OVER', gameoverConfig).setOrigin(0);
        this.instructions = this.add.text(170, 270, 'Press SPACE to restart', instructionsConfig).setOrigin(0);

        //defining keys (probs will delete this)
        this.pointer = this.input.activePointer;
        //space key
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    }
    
    update(){
        //make instructions move up and down
        
        if (keySpace.isDown) {
            this.end.stop();
            this.scene.start('playScene');    
          };


    }

}