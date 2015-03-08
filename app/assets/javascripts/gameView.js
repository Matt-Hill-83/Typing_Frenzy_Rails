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



  // ################
  // I think this is not working because it is loading before the page is built.
  // Because I moved a bunch of stuff into the application.html.erb
  function countdown( elementName, minutes, seconds )
  {
      var element, endTime, hours, mins, msLeft, time;

      function twoDigits( n )
      {
          return (n <= 9 ? "0" + n : n);
      }

      function updateTimer()
      {
          msLeft = endTime - (+new Date);
          if ( msLeft < 1000 ) {
              element.innerHTML = "0:00";
          } else {
              time = new Date( msLeft );
              hours = time.getUTCHours();
              mins = time.getUTCMinutes();
              element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
              setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
          }
      }

      element = document.getElementById( elementName );
      endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
      updateTimer();
  }
  var gameTimeInSec = 120;
  countdown( "countdown", 0, gameTimeInSec ); // Make this a global


  // ################


})();
