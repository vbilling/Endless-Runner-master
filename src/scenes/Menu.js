class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.image('titleScreen', './assets/titleScreen.png');

    }
    create(){
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
        this.titleScreen = this.add.tileSprite(0, 0, 640, 480, 'titleScreen').setOrigin(0, 0);

        // menu text

        this.add.text(game.config.width/2 + 15, game.config.height/2 - 50,' click to start', menuConfig).setOrigin(0.5);

        //define key
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.pointer = this.input.activePointer;

        


    }
    update(){

        if(Phaser.Input.Keyboard.JustDown(keySpace) || this.pointer.isDown ){
            game.settings = {
                platformStartSpeed: 350, 
                //spawn range, how far the rightmost platform should be from the right edge
                //before the next platform spawns in
                spawnRange: [80, 100],
                //platform width range, might be useless in my implementation
                platformSizeRange:[90,300],
                //a height range between rightmost platform and next platform to be spawned
                platformHeightRange: [-5,5],
                //a scale to be multiplied by platform HeightRange
                platformHeightScale: 20, 
                //platform max and min height
                platformVerticalLimit: [0.4,0.8],
                //player Gravity
                playerGravity: 900,
                //player jump force 
                jumpForce: 500, 
                //player starting x position
                playerStartPosition: 150, 
                //consecutive jumps allowed
                jumps: 2
            }
            this.scene.start('introScene');
        }

    }

}