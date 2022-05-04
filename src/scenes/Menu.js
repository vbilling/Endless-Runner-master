class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.image('titleScreen', './assets/titleScreen.png');
        this.load.image('baby', './assets/baby.png');
        this.load.image('title', './assets/title.png');

        this.load.audio('menuSong', './assets/Daddy_Seahorse_Title_Screen.wav');

    }
    create(){

        this.menuSong = this.sound.add('menuSong');
        this.menuSong.play();
        this.menuSong.loop = true;

        let menuConfig = {
            fontFamily: 'Phosphate',
            fontSize: '24px',
            color: 'white',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // background around window
        document.body.style.backgroundColor = "#48cad9";
        // loading title screen
        this.titleScreen = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'titleScreen').setOrigin(0, 0);

        // menu text
        this.startText = this.add.text(game.config.width/2 + 15, game.config.height/2 - 50,'press space to start', menuConfig).setOrigin(0.5);

        //define key
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        //baby seahorse particles
        var babies = this.add.particles('baby');
        babies.createEmitter({
            //frame: 'blue',
            x: 420, 
            y: 290,
            lifespan: 3000,
            speed: { min: 50, max: 100},
            angle: 300,
            //gravityY: -50,
            frequency: 0.5,
            gravityX: -120,
            scale: { start: 1, end: 1.5 }, //0.4, 0
            quantity: 0.003,
            //blendMode: 'ADD'
        });

        this.add.sprite(23.5, -17, 'title').setOrigin(0);
        
        // menu text
        this.startText = this.add.text(game.config.width/2 + 15, game.config.height/2 - 50,'press space to start', menuConfig).setOrigin(0.5);

        


    }
    update(){

        if(Phaser.Input.Keyboard.JustDown(keySpace) ){
            game.settings = {
                // ground position, where 0: top of the screen, 1: bottom of the screen
                groundPosition: 3 / 4,
 
                // ball x position, where 0: left of the screen, 1: right of the screen
                ballPosition: 1 / 5,
 
                // distance range from the center of each platform, in pixels
                platformDistanceRange: [15, 60], //150, 250
 
                //FROM PAST TUTORIAL
                platformStartSpeed: 300, //used to be 350 //same at platformSpeed // 250
                //spawn range, how far the rightmost platform should be from the right edge
                //before the next platform spawns in
                spawnRange: [30, 100], //80, 100 // 30, 50 //30, 100
                //platform width range, might be useless in my implementation
                platformSizeRange:[30,100], // is platformLengthRange // 90, 300
                //a height range between rightmost platform and next platform to be spawned
                platformHeightRange: [-5,5],
                //a scale to be multiplied by platform HeightRange
                platformHeightScale: 20, 
                //platform max and min height
                platformVerticalLimit: [0.6,0.9], //0.4,0.8
                //player Gravity
                playerGravity: 500, //is ballGravity
                //player jump force 
                jumpForce: 900, //used to be 500 //is ballHeight
                //player starting x position
                playerStartPosition: 150, 
            }
            this.menuSong.stop();
            this.scene.start('introScene');
        }

    }

}