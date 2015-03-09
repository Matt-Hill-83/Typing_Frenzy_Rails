(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var Bullet = TypingFrenzy.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    this.pressedKey = options.pressedKey;
    this.img=new Image();
    this.img.src= "assets/bubble_24x24.png";

    TypingFrenzy.MovingObject.call(this, options);
  };


  // Needed for collision detection.
  Bullet.RADIUS = 10;

  TypingFrenzy.Util.inherits(Bullet, TypingFrenzy.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof TypingFrenzy.Fish) {
      var text = otherObject.text;
      var char_1 = text[0];

      // Make sure the fish is the active fish
      if (this.game.activeFish === this.game.fishes.indexOf(otherObject)) {
        // If the first character of the fish text matches the key pressed,
        // remove the bullet, and remove the first character
        if (char_1 === this.pressedKey){
          this.remove();
          otherObject.removeChar();

          // Refactor this into a function.
          this.game.points += 1;
          document.getElementById( 'wpm-box' ).innerHTML = this.game.points;

        };

        // If all the characters have been removed, remove the fish
        if (otherObject.text.length === 0){
          otherObject.remove();
          this.game.activeFish = -1;
          this.game.addFish(1);
        }
      }

    }
  };

  Bullet.prototype.isWrappable = false

  Bullet.prototype.setActiveFishVariable = function () {
    // Check to see whether a fish has been made active and if so, set activeFish
    for (var i=0; i < this.game.fishes.length; i++){
      var active = this.game.fishes[i].active
      if (active) { this.game.activeFish = i };
    };

  };

  Bullet.prototype.activateFishIfMatch = function () {
    // If no fish are active, find the first fish, if any, that matches the
    // pressed key and activate it.
    if (this.game.activeFish < 0) {

      // Try to find a fish whose first letter matches the key pressed.
      for (var i=0; i < this.game.fishes.length; i++){
        var fish = this.game.fishes[i];
        var firstChar = fish.text[0];

        // Exclude fishes who are not yet fully on the screen.
        // Do I need to add or subtract the fish length here?
        var fishFullyOnScreen = fish.pos[0] > 0 && fish.pos[0] < TypingFrenzy.Game.DIM_X;

        if (firstChar === this.pressedKey && fishFullyOnScreen){
          // Set fish to active.
          this.game.fishes[i].active = true;
          break;
        };
      }; // end for loop
    };  // end if
  };

  Bullet.prototype.createTrajectory = function () {
    // If a fish has been activated, shoot at it, otherwise shoot to the right.
    if (this.game.activeFish >= 0){
      this.aimAtFish();
    } else {
      this.vel = [0, 10]
      // Add key to wrongKey list
      this.game.wrongLettersString += this.pressedKey;
      document.getElementById( 'misses-box' ).innerHTML = this.game.wrongLettersString;
    }

  };

  Bullet.prototype.aimAtFish = function () {
      var octopusX = this.game.ships[0].pos[0];
      var octopusY = this.game.ships[0].pos[1];

      var fishX = this.game.fishes[this.game.activeFish].pos[0];
      var fishY = this.game.fishes[this.game.activeFish].pos[1];

      var slope = ((fishY - octopusY)/(fishX - octopusX))
      var rise = (fishY - octopusY)/10
      var run = (fishX - octopusX)/10

      this.vel = [run,rise];
  }

  Bullet.prototype.drawImage = function (ctx) {
    var x = this.pos[0];
    var y = this.pos[1];
    ctx.drawImage(this.img, x -12, y -12);
  };

  Bullet.prototype.draw = function (ctx) {
    this.setActiveFishVariable();
    this.activateFishIfMatch();
    this.createTrajectory();
    this.drawImage(ctx);
  };
})();
