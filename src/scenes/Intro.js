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
            repeat: 100
        });

        this.clock = this.time.delayedCall(8800, () => {
            this.intro2 = this.add.sprite(0,0, 'intro2').setOrigin(0);
            this.intro2.anims.play('intro_2')});
            
        this.clock = this.time.delayedCall(12000, () => {
            this.intro2 = this.add.sprite(0,0, 'intro3').setOrigin(0);
            this.intro2.anims.play('intro_3')});
        
        this.clock = this.time.delayedCall(15000, () => {
            this.scene.start('playScene');
        })

    }
    
    update(){


    }

}