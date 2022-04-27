class Seahorse extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        // add object to existing scene

        this.myArcadeBody = scene.physics.add.sprite(game.settings.playerStartPosition, game.config.height / 2, texture);
        this.myArcadeBody.setGravityY(game.settings.playerGravity);
        

        // number of consecutive jumps made by the player
        this.playerJumps = 0;

        this.playerHadJumped = false;

    }

    create(){
        //creating the seahorse's thoughts while you play
        var phrases_array = ["I'm going to be a father", "Better Hurry", "AHHHH"]
        function random(mn, mx) {
            return Math.round(Math.random() * (mx - mn) + mn);
        };
    }


    //the player jumps when on the ground, or in the air if any jumps are left            
    update(){
        // makeing a random phrase from the phrases array be choosen and appear after a few seconds 
        //if(i < 500, i++) {
            //console.log('i =', i);
        //}else{
            //i = 0;
        //};
        //if (i == 300) {
            //pick_phrase = random(0,2);
            //this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*1.7, phrases.array[pick_phrase], menuConfig);
        //};
        
        this.myArcadeBody.x = game.settings.playerStartPosition;
        this.myArcadeBody.setVelocityX(game.settings.platformStartSpeed);

    }

    

}