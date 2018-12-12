<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Escape The Dungeon</title>
    <script src="//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"></script>
    <style type="text/css">
        body {
            margin: 0;
        }

    </style>
</head>

<body>
    <script type="text/javascript">
        
        let gameScene = new Phaser.Scene('game');
        let menuScene = new Phaser.Scene('menu');

        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        y: 300
                    },
                    debug: false
                }
            },
            scene: [menuScene,gameScene]
            
            
        };

        var player;
        var awards;
        var platforms;
        var cursors;
        var score = 0;
        var scoreText;
        var game = new Phaser.Game(config);
        var pad;
        var stick;


gameScene.preload = function() {
            
            this.load.audio('beep','music/sound1.ogg');
            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(240, 270, 320, 50);
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                    //assetText.setText('Loading asset: ' + file.key);    
                }
            });
            assetText.setOrigin(0.5, 0.5);
            this.load.on('progress', function(value) {
                console.log(value);
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(250, 280, 300 * value, 30);
                percentText.setText(parseInt(value * 100) + '%');
            });
            this.load.on('fileprogress', function(file) {
                assetText.setText('Loading asset: ' + file.key);
            });
            this.load.on('complete', function() {
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });
            loadingText.setOrigin(0.5, 0.5);
            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(240, 270, 320, 50);
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            this.load.image('right','assets/arrowbutton.png');  
            this.load.image('left','assets/left.png'); 
            this.load.image('down','assets/down.png');  
            this.load.image('up','assets/up.png'); 
            this.load.image('door', 'assets/doorway2.png');
            this.load.image('trap', 'assets/trap.png');
            this.load.image('enemy', 'assets/enemy.png');
            this.load.image('platforms', 'assets/platforms.png');
            this.load.image('platformsb', 'assets/platformsB.png');
            this.load.image('award', 'assets/award.png');
            this.load.image('cave', 'assets/cave.png');
            this.load.spritesheet('player', 'assets/player2.png', {
                frameWidth: 32,
                frameHeight: 48
            });
        }

gameScene.create = function() {
            
            soundName = this.sound.add('beep');
            soundName.play();
            this.background = this.add.tileSprite(0, 0, 2000, 1500, 'cave');
            this.add.image(700, 100, 'door');
            this.control_right=this.physics.add.sprite(200,200,'right');
            this.control_left=this.physics.add.sprite(100,200,'left');
            this.control_down=this.physics.add.sprite(150,250,'down');
            this.control_up=this.physics.add.sprite(150,150,'up');
            this.control_right.body.setAllowGravity(false);
            this.control_left.body.setAllowGravity(false);
            this.control_up.body.setAllowGravity(false);
            this.control_down.body.setAllowGravity(false);
            this.control_right.setInteractive();
            this.control_left.setInteractive();
            this.control_down.setInteractive();
            this.control_up.setInteractive();
            platforms = this.physics.add.staticGroup();
            this.control_left.on('pointerdown',function (event){
                  player.setVelocity(-50, 0);
            })

            this.control_right.on('pointerdown',function (event){
                  player.setVelocity(50, 0);
            })
             this.control_up.on('pointerdown',function (event){
                  player.setVelocity(150,1500);
            })
             this.control_down.on('pointerdown',function (event){
                  player.setVelocity(-150,1500);
            })
            platforms.create(400, 575, 'platforms');
            platforms.create(675, 140, 'platformsb');
            platforms.create(725, 140, 'platformsb');
            platforms.create(250, 500, 'platformsb');
            platforms.create(200, 500, 'platformsb');
            platforms.create(450, 450, 'platformsb');
            platforms.create(400, 450, 'platformsb');
            platforms.create(325, 300, 'platformsb');
            platforms.create(600, 220, 'platformsb');
            platforms.create(500, 350, 'platformsb');
            platforms.create(700, 400, 'platformsb');
            platforms.create(750, 400, 'platformsb');
            platforms.create(323, 120, 'platformsb');
            platforms.create(600, 575, 'trap');
            platforms.create(800, 575, 'platforms');
            platforms.create(750, 575, 'platforms');
            platforms.create(700, 575, 'platforms');
            platforms.create(650, 575, 'trap');
            platforms.create(550, 575, 'platforms');
            platforms.create(500, 575, 'platforms');
            platforms.create(450, 575, 'platforms');
            platforms.create(350, 575, 'platforms');
            platforms.create(300, 575, 'platforms');
            platforms.create(250, 575, 'platforms');
            platforms.create(200, 575, 'platforms');
            platforms.create(150, 575, 'platforms');
            platforms.create(100, 575, 'platforms');
            platforms.create(50, 575, 'platforms');
            platforms.create(0, 575, 'platforms');
            console.log(platforms);
            player = this.physics.add.sprite(100, 450, 'player');
            player.setBounce(0.2);
            player.setCollideWorldBounds(true);
            cursors = this.input.keyboard.createCursorKeys();
            awards = this.physics.add.group({
               key:'award',
               repeat: 11,
               setXY: { x: 12, y: 0, stepX: 70 } 
            });
            
            awards.children.iterate(function (child){
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            });
            
            scoreText = this.add.text(600, 25, 'score: 0', {
                fontSize: '32px',
                fill: '#ffffff'
            });
            
            
            this.physics.add.collider(player, platforms);
            this.physics.add.collider(awards, platforms);
            this.physics.add.overlap(player, awards, collectAward, null, this);
            
            this.input.keyboard.on('keydown_A', function(event) {
                player.setVelocity(-50, 0);
            });

            this.input.keyboard.on('keyup_D', function(event) {
                player.setVelocity(50, 0);
            });ad

            this.input.keyboard.on('keyup_W', function(event) {
                player.setVelocity(150, 1500);
                console.log("W");
            });
            this.input.keyboard.on('keydown_S', function(event) {
                player.setVelocity(-150, 1500);
                console.log("S");
            });
        };




gameScene.update = function() {
       
        }
        function collectAward(player, awards) {
            awards.disableBody(true, true);
            score += 10;
            scoreText.setText('Score: ' + score);
         
        }

    </script>
</body>

</html>

