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
          var elementName = 'wpm-box';
          var element = document.getElementById( elementName );
          this.game.points += 1;
          element.innerHTML = this.game.points;
        }

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

  Bullet.prototype.draw = function (ctx) {
    var octopusX = this.game.ships[0].pos[0];
    var octopusY = this.game.ships[0].pos[1];

    // Check to see whether a fish has been made active.
    for (var i=0; i < this.game.fishes.length; i++){
      var active = this.game.fishes[i].active
      if (active) { this.game.activeFish = i };
    };

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
          // Don't break here, you want to get the last matching fish because
          // it will be the highest in z-order
          break;
        };
      };
    };

    // If a fish has been activated, shoot at it, otherwise shoot to the right.
    if (this.game.activeFish >= 0){
      var fishX = this.game.fishes[this.game.activeFish].pos[0];
      var fishY = this.game.fishes[this.game.activeFish].pos[1];

      var slope = ((fishY - octopusY)/(fishX - octopusX))
      var rise = (fishY - octopusY)/10
      var run = (fishX - octopusX)/10

      this.vel = [run,rise];
    } else {
      this.vel = [0, 10]
    }

      var x = this.pos[0];
      var y = this.pos[1];

      ctx.drawImage(this.img, x -12, y -12);

    // // Draw line
    // ctx.beginPath();
    // ctx.moveTo(octopusX,octopusY);
    // ctx.lineTo(fishX,fishY);
    // ctx.stroke();

  };
})();
