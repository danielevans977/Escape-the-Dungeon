const game = new Phaser.Game(800,600, Phaser.AUTO,"",{
    preload: preload,
    create: create,
    update: update    
}
)


function preload(){
    game.load.image('award', 'assets/award.png')
    game.load.image('doorway','assets/doorway2.png') 
    game.load.image('platforms','assets/platforms.png')
    game.load.image('platforms2','assets/platformsB.png')
    game.load.image('cave','assets/cave background tile2.png')     
    //game.load.sprite('player','assets/player.png',32,32)    
}

function create(){
    var music;
     music = this.sound.add('bgmusic');
  music.play();
    
    console.log(game);
    //game.physics.startSystem(Phaser,Physics.ARCADE)   

    game.add.sprite(0,0, 'cave') 

    platforms = game.add.group() 
    platforms.enableBody = true

    let ground = platforms.create(0, game.world.height = 64, "platforms")    
    ground.scale.setTo(2,2)
    ground.body.immovable = true

    let ledge = platforms.create(400,450, "ground")  
    
    
}


function update(){}