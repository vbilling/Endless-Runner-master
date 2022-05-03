class Instructions extends Phaser.Scene{
    constructor(){
        super("instructionScene");
    }

    preload(){
        this.load.image('instructions', './assets/instructions.png');
    }
    create(){
        this.background = this.add.tileSprite(0,0, game.config.width, game.config.height,'instructions').setOrigin(0,0);


    }

    update(){
        
    }
}