class Jellyfish extends Phaser.GameObjects.Sprite{
    constructor(scene, platformPool, platformGroup, texture){
        super(scene, platformPool, platformGroup, texture);

        this.group = platformGroup;
        this.pool = platformPool;
        this.nextPlatformDistance;
        this.scene = scene;
        this.texture = texture;
        this.addedPlatforms = 0;

        this.platform;


    }
    update(){

        //recyling platforms
        let minDistance = game.config.width;
        let rightmostPlatformHeight = 0;
        this.group.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth /2;
            if(platformDistance < minDistance){
                minDistance = platformDistance;
                rightmostPlatformHeight = platform.y;
            }
            if(platform.x < - platform.displayWidth / 2){
                this.group.killAndHide(platform);
                this.group.remove(platform);
            }
        }, this);

        //adding new platforms 
        if(minDistance > this.nextPlatformDistance){
            let nextPlatformWidth = Phaser.Math.Between(game.settings.platformSizeRange[0], game.settings.platformSizeRange[1]);
            let platformRandomHeight = game.settings.platformHeightScale * Phaser.Math.Between(game.settings.platformHeightRange[0], game.settings.platformHeightRange[1]);
            let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
            let minPlatformHeight = game.config.height * game.settings.platformVerticalLimit[0];
            let maxPlatformHeight = game.config.height * game.settings.platformVerticalLimit[1];
            let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
            this.addPlatform(game.config.width + nextPlatformWidth/2, nextPlatformHeight); 
        }

    }

    // platforms are added from the pool or generated
    addPlatform(posX, posY){
        this.addedPlatforms++;
        //console.log('getLength', this.pool.getLength());
        if(this.pool.getLength()){
            this.platform = this.pool.getFirst();
            this.platform.x = posX;
            this.platform.y = posY;
            this.platform.active = true;
            this.platform.visible = true;
            this.pool.remove(this.platform);
        }
        else{
            this.platform = this.scene.physics.add.sprite(posX, posY, this.texture);
            this.platform.setImmovable(true); //platforms fall when set ot false
            this.platform.setSize(100, 80);
            this.platform.setVelocityX(game.settings.platformStartSpeed * - 1);
            this.group.add(this.platform);
        }
        this.nextPlatformDistance = Phaser.Math.Between(game.settings.spawnRange[0], game.settings.spawnRange[1]);
    }


}