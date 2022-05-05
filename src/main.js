let config = {
    type: Phaser.CANVAS, 
    width: 640, 
    height: 480, 
    scene: [ Menu, Play, Intro, Gameover, Instructions], 
    physics: {
        default: "arcade", 
        arcade: {
            debug: false,
        }
    }
}

//uncomment if tutorial code below is deleted
let game = new Phaser.Game(config);

let highscore = 0;

//will keep track if its your first time playing so the instructions are displayed
let tutorial = 0;

// reserve keyboard vars
let keyLEFT;

let keySpace;

/*
Made by: Victoria Billings, Karoline Lujan, William Morales 
Completed on: May 4, 2022
Creative Tilt: 
the way our mechanic makes you fall faster by holding space 
and an automatic jump is unique and beyond the examples in class. 
The use of particles for the baby seahorses in the title screen, bubble trail, 
and jelly fish tears are art that I am proud of and the seahorse's thoughts 
is a funny and creative element. The music is also all original!

Code for random platform generation came from:
https://www.emanueleferonato.com/tag/endless-runner/
*/




