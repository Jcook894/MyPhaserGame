var game = new Phaser.Game(800, 600, Phaser.CANVAS,'gameDiv');

var spaceField;
var backgroundV = 2;
var player;
var cursors;
var bullets
var bulletTime = 0; //space between each shot.
var fireButton;

var mainState = {
  preload: function(){
    game.load.image('starField', 'assets/Starfield.png');
    game.load.image('player', 'assets/ship.png');
    game.load.image('bullets', 'assets/bullet.png');


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
  },
  update: function(){
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

game.state.add('mainState', mainState);

game.state.start('mainState');
