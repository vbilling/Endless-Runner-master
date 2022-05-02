class Intro extends Phaser.Scene{
    constructor(){
        super("introScene");
    }
    preload(){
        this.load.spritesheet('intro1', './assets/intro1.png', {frameWidth: 640, frameHeight: 480, startFrame: 0});
        this.load.spritesheet('intro2', './assets/intro2.png', {frameWidth: 640, frameHeight: 480, startFrame: 0});
        this.load.spritesheet('intro3', './assets/intro3.png', {frameWidth: 640, frameHeight: 480, startFrame: 0});

    }
    create(){
        //defining space key
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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
        //will tell space key code in update when it is time to skip to play scene
        this.continue = false;

        this.intro1 = this.add.sprite(0,0, 'intro1').setOrigin(0);
        this.anims.create({
            key: 'intro_1',
            frames: this.anims.generateFrameNumbers('intro1', {start: 0, end: 64, first: 0}),
            frameRate: 8
        });
        this.intro1.anims.play('intro_1');

        //this.intro2 = this.add.sprite(1,1, 'intro2').setOrigin(0);
        this.anims.create({
            key: 'intro_2',
            frames: this.anims.generateFrameNumbers('intro2', {start: 0, end: 1, first: 0}),
            frameRate: 15,
            repeat: 100
        });
        this.anims.create({
            key: 'intro_3',
            frames: this.anims.generateFrameNumbers('intro3', {start: 0, end: 1, first: 0}),
            frameRate: 15,
            repeat: -1
        });

        this.clock = this.time.delayedCall(8800, () => {
            this.intro2 = this.add.sprite(0,0, 'intro2').setOrigin(0);
            this.intro2.anims.play('intro_2')});
            
        this.clock = this.time.delayedCall(12000, () => {
            this.intro2 = this.add.sprite(0,0, 'intro3').setOrigin(0);
            this.intro2.anims.play('intro_3')
        });
        ;

                
        this.clock = this.time.delayedCall(14000, () => {
            this.continuetext = this.add.text(150, 400, 'Press Space to Continue', instructionsConfig).setOrigin(0);
            this.continuetext.setAlpha(0.1);
            //will tell space key code in update when it is time to skip to play scene
            this.continue = true;


            
        });
        //make it fade in
        this.clock = this.time.delayedCall(14100, () => {
            this.continuetext.setAlpha(0.2);
        });
        this.clock = this.time.delayedCall(14200, () => {
            this.continuetext.setAlpha(0.3);
        });
        this.clock = this.time.delayedCall(14300, () => {
            this.continuetext.setAlpha(0.4);
        });
        this.clock = this.time.delayedCall(14400, () => {
            this.continuetext.setAlpha(0.5);
        });
        this.clock = this.time.delayedCall(14500, () => {
            this.continuetext.setAlpha(0.6);
        });
        this.clock = this.time.delayedCall(14600, () => {
            this.continuetext.setAlpha(0.7);
        });
        this.clock = this.time.delayedCall(14700, () => {
            this.continuetext.setAlpha(0.8);
        });
        this.clock = this.time.delayedCall(14800, () => {
            this.continuetext.setAlpha(0.9);
        });
        this.clock = this.time.delayedCall(14900, () => {
            this.continuetext.setAlpha(1);
        });

        let introConfig = {
            fontFamily: 'Arial Black',
            fontSize: '36px',
            color: 'white',
            align: 'center',
            stroke: 'black', //#526aba
            strokeThickness: 3,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //have intro text fade out
        this.introtext = this.add.text(30, 30, "Intro:", introConfig).setOrigin(0);
        this.clock = this.time.delayedCall(1000, () => {
            this.introtext.setAlpha(0.9);
        });
        this.clock = this.time.delayedCall(1100, () => {
            this.introtext.setAlpha(0.8);
        });
        this.clock = this.time.delayedCall(1200, () => {
            this.introtext.setAlpha(0.7);
        });
        this.clock = this.time.delayedCall(1300, () => {
            this.introtext.setAlpha(0.6);
        });
        this.clock = this.time.delayedCall(1400, () => {
            this.introtext.setAlpha(0.5);
        });
        this.clock = this.time.delayedCall(1500, () => {
            this.introtext.setAlpha(0.4);
        });
        this.clock = this.time.delayedCall(1600, () => {
            this.introtext.setAlpha(0.3);
        });
        this.clock = this.time.delayedCall(1700, () => {
            this.introtext.setAlpha(0.2);
        });
        this.clock = this.time.delayedCall(1800, () => {
            this.introtext.setAlpha(0.1);
        })
        this.clock = this.time.delayedCall(1900, () => {
            this.introtext.setAlpha(0);
        })


    }
    
    update(){
        if(this.continue == true && keySpace.isDown){
            this.scene.start('playScene');
        };

    }

}