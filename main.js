var game = new Phaser.Game(800, 600, Phaser.CANVAS,'gameDiv');

var spaceField;
var backgroundV;
var player;

var mainState = {
  preload: function(){
    game.load.image('starField', 'assets/Starfield.png');
    game.load.image('player', 'assets/ship.png');

  },
  create: function(){
    // Appends background to the canvas.
    spaceField = game.add.tileSprite(0,0,800,600,'starField');
    backgroundV = 2;

    // Appends ship.png to the canvas.
    player = game.add.sprite(game.world.centerX,game.world.centerY + 250, 'player');

  },
  update: function(){
    // Updates the background and makes it move up the canvas.
    spaceField.tilePosition.y += backgroundV;

  }

}

game.state.add('mainState', mainState);

game.state.start('mainState');
