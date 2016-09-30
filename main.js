var game = new Phaser.Game(800, 600, Phaser.CANVAS,'gameDiv');

var spaceField;
var backgroundV;

var mainState = {
  preload: function(){
    game.load.image('starField', 'assets/Starfield.png');


  },
  create: function(){
    // Appends background to the canvas.
    spaceField = game.add.tileSprite(0,0,800,600,'starField');
    backgroundV = 2;



  },
  update: function(){
    // Updates the background and makes it move up the canvas.
    spaceField.tilePosition.y += backgroundV;

  }

}

game.state.add('mainState', mainState);

game.state.start('mainState');
