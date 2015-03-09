(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var Ship = TypingFrenzy.Ship = function (options) {
    options.vel = [0, 0];
    TypingFrenzy.MovingObject.call(this, options)
    this.image=new Image();
    this.image.src= 'assets/octopus_02_100x100.png';

    this.image_kbd=new Image();
    this.image_kbd.src= "assets/keyboard/QWERTY_500x176.png";
    // this.image_kbd.src= "assets/keyboard/keyboad_mac_01_v03_500x176.png";
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
    this.game.ctx_kbd.drawImage(this.image_kbd, 0, 0);

    TypingFrenzy.KeyboardHeatMap.drawKeyboardRectangles(this.game.ctx_kbd);
  };


  // Ship.prototype.drawKeyboardRectangles = function(){
  //   row_1 = [29, 29, 29, 29,29, 29, 29, 29,29, 29, 29, 29, 29, 49];
  //   row_2 = [47, 29, 29, 29,29, 29, 29, 29,29, 29, 29, 29, 29, 29];
  //   row_3 = [55, 29, 29, 29,29, 29, 29, 29,29, 29, 29, 29, 56];
  //   row_4 = [70, 29, 29, 29, 31, 29, 29, 29,29, 29, 29, 75];
  //   row_5 = [29, 29, 29, 38,165, 36, 29];
  //   this.keyboardRectangleWidths = [];
  //   this.keyboardRectangleWidths.push(row_1);
  //   this.keyboardRectangleWidths.push(row_2);
  //   this.keyboardRectangleWidths.push(row_3);
  //   this.keyboardRectangleWidths.push(row_4);
  //   this.keyboardRectangleWidths.push(row_5);
  //
  //   this.rowHeights = [29, 29, 29, 29,33];
  //
  //   var xOffset = 8;
  //   var yOffset = 4;
  //
  //   var xInterKeySpacing = 4.6;
  //   var yInterKeySpacing = 3.3;
  //   var totalY = yOffset;
  //
  //   for (j = 0; j < this.keyboardRectangleWidths.length; j++){
  //     var keyboardRowArray = this.keyboardRectangleWidths[j];
  //     keyHeight = this.rowHeights[j];
  //     var yKeyPlusSpacing = yInterKeySpacing + keyHeight;
  //
  //     var totalX = xOffset;
  //     for (i = 0; i < keyboardRowArray.length; i++){
  //       keyWidth = keyboardRowArray[i]
  //       var xKeyPlusSpacing = xInterKeySpacing + keyWidth;
  //
  //       this.game.ctx_kbd.rect( totalX ,totalY,keyWidth,keyHeight);
  //       totalX += xKeyPlusSpacing;
  //
  //       this.game.ctx_kbd.stroke();
  //     }; // for i
  //     totalY += yKeyPlusSpacing;
  //   }; // for j
  // };

})();
