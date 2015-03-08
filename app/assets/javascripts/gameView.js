(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var GameView = TypingFrenzy.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    for (i = 33; i <= 64; i++) {
      var chr = String.fromCharCode(i);
      key(chr, function (event, handler) { ship.processKeystroke(event, handler) });
      key('shift+'+ chr, function(event, handler) { ship.processKeystroke(event, handler) } );
    }
    key("space", function(event, handler) { ship.processKeystroke(event, handler) } );
    for (i = 91; i <= 126; i++) {
      var chr = String.fromCharCode(i);
      key(chr, function (event, handler) { ship.processKeystroke(event, handler) });
      key('shift+'+ chr, function(event, handler) { ship.processKeystroke(event, handler) } );
    }

  };

  GameView.prototype.start = function () {
    // document.getElementById("start-game").style.color = "white";

    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / TypingFrenzy.Game.FPS

    );

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };



})();
