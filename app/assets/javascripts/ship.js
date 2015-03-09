(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var Ship = TypingFrenzy.Ship = function (options) {
    options.vel = [0, 0];
    TypingFrenzy.MovingObject.call(this, options)
    this.image=new Image();
    this.image.src= 'assets/octopus_02_100x100.png';

    // this.image_kbd=new Image();
    // this.image_kbd.src= "assets/keyboard/QWERTY_500x176.png";
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
    this.fireBullet(pressedKey);
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
    // this.game.ctx_kbd.drawImage(this.image_kbd, 0, 0);

    TypingFrenzy.KeyboardHeatMap.drawKeyboardRectangles(this.game.ctx_kbd);
  };

})();
