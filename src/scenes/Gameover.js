class Gameover extends Phaser.Scene{
    constructor(){
        super("gameoverScene");
    }
    preload(){
        this.load.image('deathScreen', './assets/deathScreen.png');
        this.load.spritesheet('jellyfishGreen', './assets/jellyfishGreen.png', {frameWidth: 180, frameHeight: 180, startFrame: 0, endFrame: 7});
        this.load.spritesheet('jellyfishBlue', './assets/jellyfishBlue.png', {frameWidth: 180, frameHeight: 180, startFrame: 0, endFrame: 7});
        this.load.spritesheet('jellyfishPinkDeath', './assets/jellyfishPink.png', {frameWidth: 180, frameHeight: 180, startFrame: 0, endFrame: 7});
        this.load.image('deadSeahorse', './assets/deadSeahorse.png');


    }
    create(){
        this.deathScreen = this.add.tileSprite(0, 0, 640, 480, 'deathScreen').setOrigin(0, 0);
        this.jellyfishGreen = this.add.sprite(30, 45, 'jellyfishGreen').setOrigin(0);
        this.jellyfishBlue = this.add.sprite(230, 10, 'jellyfishBlue').setOrigin(0);
        this.jellyfishPinkDeath = this.add.sprite(430, 45, 'jellyfishPinkDeath').setOrigin(0);
        this.deadSeahorse = this.add.sprite(200, 290, 'deadSeahorse').setOrigin(0);


        

        this.anims.create({
            key: 'swim1',
            frames: this.anims.generateFrameNames('jellyfishGreen', {start: 0, end: 7, first: 0}),
                frameRate: 7,
                repeat: -1
        });
        this.anims.create({
            key: 'swim2',
            frames: this.anims.generateFrameNames('jellyfishBlue', {start: 1, end: 7, first: 0}),
                frameRate: 7,
                repeat: -1
        });
        this.anims.create({
            key: 'swim3',
            frames: this.anims.generateFrameNames('jellyfishPinkDeath', {start: 0, end: 7, first: 0}),
                frameRate: 7,
                repeat: -1
        });
        //console.log(this.jellyfishPink);
        this.jellyfishGreen.anims.play('swim1');
        this.jellyfishBlue.anims.play('swim2');
        this.jellyfishPinkDeath.anims.play('swim3');

        let gameoverConfig = {
            fontFamily: 'Phosphate',
            fontSize: '70px',
            color: 'red',
            align: 'center',
            stroke: 'white', //#526aba
            strokeThickness: 5,
            padding: {
                top: 5,
                bottom: 4
            }
        };
        let instructionsConfig = {
            fontFamily: 'Chalkduster',
            fontSize: '30px',
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
            fontFamily: 'Chalkduster',
            fontSize: '20px',
            color: 'white',
            align: 'center',
            stroke: 'black', //#526aba
            strokeThickness: 3.5,
            padding: {
                top: 5,
                bottom: 4
            }
        };

        //console.log('highscore:', highscore);
        this.scoretext = this.add.text(250, 140, 'High Score:', highscoreConfig).setOrigin(0);
        this.add.text(this.scoretext.x + 130, this.scoretext.y, highscore, highscoreConfig).setOrigin(0);
        this.add.text(140, 170, 'GAME OVER', gameoverConfig).setOrigin(0);
        this.add.text(200, 250, 'click to restart', instructionsConfig).setOrigin(0);

        //defining keys
        this.pointer = this.input.activePointer;


    }
    
    update(){
        if (this.pointer.isDown) {
            this.scene.start('playScene');    
          };


    }

}