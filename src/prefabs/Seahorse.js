class Seahorse extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        // add object to existing scene

        //from new tutorial
        //this.horse = this.physics.add.sprite(game.config.width * game.settings.ballPosition, game.config.height * game.settings.groundPosition - game.settings.jumpForce, "seahorseJump");

        this.myArcadeBody = scene.physics.add.sprite(game.settings.playerStartPosition, game.config.height / 2 - 50, texture); //game.settings.playerStartPosition, game.config.height / 2, texture);
        this.myArcadeBody.setGravityY(game.settings.playerGravity);

        //from new tutorial
        this.myArcadeBody.setBounce(0.9);
        //new
        this.myArcadeBody.setVelocityY(1);
        

        // number of consecutive jumps made by the player
        this.playerJumps = 0;

        this.playerHadJumped = false;

        

    }

    create(){

    }


    //the player jumps when on the ground, or in the air if any jumps are left            
    update(){

        this.myArcadeBody.x = game.settings.playerStartPosition;
        this.myArcadeBody.setVelocityX(game.settings.platformStartSpeed);

    }

    

}