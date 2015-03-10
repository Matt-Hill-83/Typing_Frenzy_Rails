(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var Ship = TypingFrenzy.Ship = function (options) {
    options.vel = [0, 0];
    TypingFrenzy.MovingObject.call(this, options)
    this.image=new Image();
    this.image.src= 'assets/octopus_02_100x100.png';
    this.game = options.game;
  };

  TypingFrenzy.Util.inherits(Ship, TypingFrenzy.MovingObject);

  Ship.prototype.processKeystroke = function (event, handler) {
    var pressedKey = '';
    if (handler.shortcut === 'space'){
      pressedKey = " "
    } else {
      pressedKey = handler.shortcut.slice(-1)
      if (event.shiftKey ==+ true) { pressedKey = TypingFrenzy.Util.shiftedKeys(pressedKey) }
    };
    // console.log('-------------');
    // console.log('in ship: ' + this.game.demoMode);
    // console.log('in ship: ' + this.game.timeSig);
    // debugger

    //For each bullet, there are two bullets fired, one with demoMode true
    // and then one with demo mode false
      this.fireBullet(pressedKey);
    // fix this.  Ship thinks its in demo mode when everyone else thinks its not,
    // if (this.game.demoMode === true) {
    // // if (game.demoMode === false) {
    //   this.fireBullet(pressedKey);
    // };
  };

  Ship.prototype.fireBullet = function (pressedKey) {
    var norm = TypingFrenzy.Util.norm(this.vel);
    var relVel = TypingFrenzy.Util.scale(
      TypingFrenzy.Util.dir(this.vel),
      TypingFrenzy.Bullet.SPEED
    );

    var bulletVel = [ 0, 0 ];

    var bullet = new TypingFrenzy.Bullet({
      pos: this.pos,
      vel: bulletVel,
      game: this.game,
      pressedKey: pressedKey
    });

    this.game.add(bullet);
  };

  Ship.prototype.draw = function (ctx) {
    var octopusX = this.pos[0];
    var octopusY = this.pos[1];

    var octopusLength = 100;
    var octopusHeight = 100;

    ctx.drawImage(this.image, octopusX - octopusLength/2, octopusY - octopusHeight);
    // TypingFrenzy.KeyboardHeatMap.drawKeyboardRectangles(this.game);
  };

})();
