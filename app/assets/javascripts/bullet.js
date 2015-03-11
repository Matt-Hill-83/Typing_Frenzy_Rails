(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var Bullet = TypingFrenzy.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    this.pressedKey = options.pressedKey;
    this.img=new Image(); // We should only do this once and make it a global
    this.img.src= "assets/bubble_24x24.png";
    this.deadBullet = false;

    TypingFrenzy.MovingObject.call(this, options);
  };

  // Needed for collision detection.
  Bullet.RADIUS = 10;

  TypingFrenzy.Util.inherits(Bullet, TypingFrenzy.MovingObject);

  Bullet.prototype.isWrappable = false

  Bullet.prototype.setActiveFishVariable = function () {
    // Check to see whether a fish has been made active and if so, set activeFish
    for (var i=0; i < this.game.fishes.length; i++){
      var active = this.game.fishes[i].active
      if (active) { this.game.activeFish = i };
    };

  };

  Bullet.prototype.activateFishIfLetterMatches = function () {
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
          this.game.activeFish = i; //just added this
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
      this.aimAtWall();
      this.storeBadChars();
    };
  };

  Bullet.prototype.storeBadChars = function () {
    // For a string of bad characters, only add the first one.
    if (this.game.lastCharGood && this.pressedKey !== '~dontadd~') {
      this.game.wrongLettersString += this.pressedKey;
      // document.getElementById( 'misses-box' ).innerHTML = this.game.wrongLettersString;
      this.game.lastCharGood = false;
    }
    this.deadBullet = true;
  }

  Bullet.prototype.aimAtWall = function () {
    this.vel = [0, 10]
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

    // If there is an active fish, check each non-dead bullet for a collision
    // with the active fish.
    this.checkforCollisions();

    // A bullet is created by the ship object every time a key is pressed,
    // regardless of whether it is the right key.

    // Check whether a fish that was activated during a previous draw cycle
    // still exists.  If so, set teh activeFish variable to its index.
    this.setActiveFishVariable();

    // If there is no active fish, look for a match between the keypress
    // and the first letter of one of the fishes.  Activate that fish.
    this.activateFishIfLetterMatches();

    // If a fish has been activated, aim the bullet at it.
    // Otherwise shoot to the right.
    this.createTrajectory();

    // Draw image
    this.drawImage(ctx);
  };

  Bullet.prototype.checkforCollisions = function () {
    var bullets = this.game.bullets;
    var fishes = this.game.fishes;

    for (i = 0; i < bullets.length; i++) {
      var bullet = bullets[i];
      var bulletNotDead = !bullet.deadBullet;
      var activeFishNum = this.game.activeFish;
      var activeFish = fishes[activeFishNum];

      var checkForCollision = bulletNotDead && activeFish;

      if (checkForCollision) {
        if (bullet.isCollidedWith(activeFish)) {
          bullet.collideWith(activeFish);
        };
      }; // end if
    }; // end for
  };

  Bullet.prototype.isCollidedWith = function (fish) {
    var centerDist = TypingFrenzy.Util.dist(this.pos, fish.pos);
    var collisionDistance = 60;
    return centerDist < collisionDistance;
  };

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof TypingFrenzy.Fish) {
      var text = otherObject.text;
      var char_1 = text[0];

      // If the collided fish is the active fish,
      // Check whether the letter matches the first letter of the fish.
      // If so, remove the bullet and the first character of the word.
      if (this.game.activeFish === this.game.fishes.indexOf(otherObject)) {
        // If the first character of the fish text matches the key pressed,
        // remove the bullet, and remove the first character
        if (char_1 === this.pressedKey){
          this.game.lastCharGood = true;
          this.remove();
          otherObject.removeChar();
          // Refactor this into a function.
          this.game.points += 1;
          // document.getElementById( 'wpm-box' ).innerHTML = this.game.points;

        }else{
          this.storeBadChars();
        };

        // If all the characters have been removed, remove the fish
        if (otherObject.text.length === 0){
          otherObject.remove();
          this.game.activeFish = -1;
          this.game.addFish(1);
          // Remove pressedkey, so that another fish isn't activated that
          // starts with the same letter as the last letter of the dead fish.

          // This is a work around.  Throw in a dummy character that can be easily removed
          // from the wrong keys string
          this.pressedKey = '~dontadd~';
        }
      }

    }
  };

})();
