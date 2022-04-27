let config = {
    type: Phaser.CANVAS, 
    width: 640, 
    height: 480, 
    scene: [ Menu, Play, Intro, Gameover], 

    physics: {
        default: "arcade", 
        arcade: {
            debug: false
        }
    }
}

let game = new Phaser.Game(config);

let highscore = 0;

// reserve keyboard vars
let keyLEFT;



let keySpace;