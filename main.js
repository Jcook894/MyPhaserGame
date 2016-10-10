var game = new Phaser.Game(800, 600, Phaser.CANVAS,'gameDiv');

var spaceField;
var backgroundV = 2;

var player;
var cursors;

var bullets
var bulletTime = 0; //space between each shot.
var fireButton;

var enemies;

var mainState = {
  preload: function(){
    game.load.image('starField', 'assets/Starfield.png');
    game.load.image('player', 'assets/ship.png');
    game.load.image('bullets', 'assets/bullet.png');
    game.load.image('enemy', 'assets/Chibi.png');


  },
  create: function(){
    // Appends background to the canvas.
    spaceField = game.add.tileSprite(0,0,800,600,'starField');

    // Appends ship.png to the canvas & enables its to move
    player = game.add.sprite(game.world.centerX,game.world.centerY + 250, 'player');
    game.physics.enable(player,Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();

    // Creates a group of 30 bullets and gives it physics.

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30,'bullets');
    bullets.setAll('anchor.x', 0);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Creates a group of enemies.
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;

  createEnemies();

  },
  update: function(){
    //gives bullets and enemies collision.
    game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);

    // Updates the background and makes it move up the canvas.
    spaceField.tilePosition.y += backgroundV;

    // Stops ship when you stop pressing the keys.
    player.body.velocity.x = 0;

    // Moves ship left to right.
    if(cursors.left.isDown)
    {
        player.body.velocity.x = - 350;
    }

    if(cursors.right.isDown)
    {
      player.body.velocity.x =  350;

    }

    if(fireButton.isDown)
    {
      fireBullet();
    }
  },



}

function fireBullet(){
  if(game.time.now > bulletTime)
  {
    bullet = bullets.getFirstExists(false);
  }

  if(bullet)
  {
    bullet.reset(player.x,player.y);
    bullet.body.velocity.y = -350;
    bulletTime = game.time.now + 200;
  }
};

// Makes the enemies move.
function createEnemies(){
  for(var y = 0; y < 4; y++){
    for(var x = 0; x <10; x++){
      var enemy = enemies.create(x*48, y*50,'enemy');
      enemy.anchor.setTo(0.5, 0.5);
    }
  }
  enemies.x = 100;
  enemies.y = 50;

  var tween = game.add.tween(enemies).to({x:200},2000, Phaser.Easing.Linear.None,true,0,1000,true);
  tween.onRepeat.add(descend, this);
}

function descend(){
  enemies.y += 10;
}

function collisionHandler (bullet, enemy){
  bullet.kill();
  enemy.kill();
}

game.state.add('mainState', mainState);

game.state.start('mainState');
