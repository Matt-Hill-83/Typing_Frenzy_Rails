(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var GameView = TypingFrenzy.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
    this.timerId2 = null;
    this.keyArray = this.createKeyArray();
    document.getElementById("keyboard-div").style.display = "none";
    document.getElementById("no-mistakes-msg").style.display = "none";
  };

GameView.prototype.createKeyArray = function(){
  var keyArray = [];

  // Create list of keys to bind.
  for (i = 33; i <= 64; i++) {
    var chr = String.fromCharCode(i);

    keyArray.push(chr);
    keyArray.push('shift+'+ chr);
  };

  for (i = 91; i <= 126; i++) {
    var chr = String.fromCharCode(i);

    keyArray.push(chr);
    keyArray.push('shift+'+ chr);
  };

  keyArray.push("space");
  return keyArray;
}

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    // Bind keys
    for (i = 0 ; i < this.keyArray.length; i++) {
      var this_key = this.keyArray[i];
      key(this_key, function(event, handler) { ship.processKeystroke(event, handler) } );
    };
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / TypingFrenzy.Game.FPS

    );
    this.bindKeyHandlers();
    // this.testTimer();
  };

  GameView.prototype.testTimer = function() {
    ship = this.ship;
    this.timerId2 = setInterval(
      function () {
        ship.fireBullet('a');
      }, 1000
    );

  }

  GameView.prototype.unbindKeys = function() {
    this.keyArray.forEach(function (char) {
      key.unbind(char);
    });
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
    clearInterval(this.timerId2);
    this.unbindKeys();
  };



})();
