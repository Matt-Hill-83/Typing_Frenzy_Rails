var SHIP_WIDTH = 25;
var SHIP_HEIGHT = 35;

(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var Game = TypingFrenzy.Game = function (options) {
    this.gameTimeInSec = 10;
    this.desiredNumFish = 4;

    this.ctx = options.ctx;
    this.ctx_kbd = options.ctx_kbd;
    this.demoMode = options.demoMode || false;

    this.backgroundLayers = [];
    this.fishes = [];
    this.bullets = [];
    this.ships = [];
    this.startWordList = 'In_Position_01';

    this.wordStarted = 0;
    this.fishNum = 0;
    this.activeFish = -1;

    this.wordList = TypingFrenzy.Util.getWordListFromListsHash(this.startWordList);
    this.addBackgroundLayers();
    this.addFish(this.desiredNumFish);

    this.points = 0;
    if (this.demoMode){
    }else{
      this.startTimer(); // Make this a global
    };
    this.wrongLettersString = '';

    // Was the last letter typed correct?
    this.lastCharGood = true;
    // Show starting time in upper left of screen.
    this.displayGameTime();

    // This must be precalled here or the keyboard image wont load
    TypingFrenzy.KeyboardHeatMap.overlayColoredRectanglesOnBadKeys(this);

  };

  Game.prototype.displayGameTime = function () {
    var  n = this.gameTimeInSec;
    var twoDigits = (n <= 9 ? "0" + n : n);
    var time = new Date( this.gameTimeInSec *1000 );
    var hours = time.getUTCHours();
    var mins = time.getUTCMinutes();
    var element = document.getElementById( 'countdown' );
    element.innerHTML = (hours ? hours + ':' + this.twoDigitTimeFromSec( mins ) : mins) + ':' + this.twoDigitTimeFromSec( time.getUTCSeconds() );
  };

  Game.prototype.twoDigitTimeFromSec = function(n) { return (n <= 9 ? "0" + n : n); }

  Game.DIM_X = 1300;
  Game.DIM_Y = 870;
  Game.FPS = 32;
  Game.NUM_FISH = 1;
  // Where should I put this?
  Game.TOTAL_FISH = 0;

  Game.prototype.getWordList = function (listName) {
    this.wordList = TypingFrenzy.Util.getWordListFromListsHash(listName);
    // Reset fish array.
    this.fishes = [];
    this.addFish(this.desiredNumFish);
  };

  Game.prototype.addFish = function (numFish) {
    for (var i = 0; i < numFish; i++) {
      this.add(new TypingFrenzy.Fish({
         game: this,
         text: TypingFrenzy.Util.newText(this.wordList, this)
         }));
    }
  };

  Game.prototype.add = function (object) {
    if (object instanceof TypingFrenzy.Fish) {
      this.fishes.push(object);
    } else if (object instanceof TypingFrenzy.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof TypingFrenzy.Ship) {
      this.ships.push(object);
    } else if (object instanceof TypingFrenzy.BackgroundLayer) {
      this.backgroundLayers.push(object);
    } else {
      throw "unidentified object type added";
    }
  };

  Game.prototype.addBackgroundLayers = function () {
      this.add(new TypingFrenzy.BackgroundLayer({ game: this,
         file: "assets/dbl_background_3105x1027.png",
         bg_vel: [.8, 0],
         pos: [-1556, 0],
         maxX: 0
         }));
      this.add(new TypingFrenzy.BackgroundLayer({ game: this,
         file: "assets/bubbles_5_3105x1027.png",
         bg_vel: [1, 0],
         maxX: 0,
         pos: [-1556, 0]
         }));
      this.add(new TypingFrenzy.BackgroundLayer({ game: this,
         file: "assets/bubbles_10_3105x1027.png",
         bg_vel: [1.5, 0],
         maxX: 0,
         pos: [-1556, 0]
         }));
      this.add(new TypingFrenzy.BackgroundLayer({ game: this,
         file: "assets/bubbles_12_3105x1027.png",
         bg_vel: [2, 0],
         pos: [-1556, 0],
         maxX: 0
         }));
  };

  Game.prototype.addShip = function () {
    var ship = new TypingFrenzy.Ship({
      pos: [TypingFrenzy.Game.DIM_X/2 - SHIP_WIDTH/2, TypingFrenzy.Game.DIM_Y - SHIP_HEIGHT],
      game: this
    });

    this.add(ship);

    return ship;
  };

  Game.prototype.allObjects = function () {
    return []
      .concat(this.backgroundLayers[0])
      .concat(this.backgroundLayers[1])
      .concat(this.fishes)
      .concat(this.backgroundLayers[2])
      .concat(this.ships)
      .concat(this.backgroundLayers[3])
      .concat(this.bullets);
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect ( 0 , 0 , TypingFrenzy.Game.DIM_X, TypingFrenzy.Game.DIM_Y );
    ctx.rect(0,0,TypingFrenzy.Game.DIM_X, TypingFrenzy.Game.DIM_Y);
    ctx.stroke();

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0)
      || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.remove = function (object) {
    // I need to kill the fish here, not replace it.  This is probably my memory leak
    if (object instanceof TypingFrenzy.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);

    } else if (object instanceof TypingFrenzy.Fish) {
      this.fishes.splice(this.fishes.indexOf(object), 1);
    //
    // } else if (object instanceof TypingFrenzy.Ship) {
    //   this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw "requested class not available.";
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
  };

  Game.prototype.gameOverActions = function () {
    // Send total points to game over screen.
    var wpm = parseInt((this.points/this.gameTimeInSec)*60/5);
    var accuracy = parseInt((this.points - this.wrongLettersString.length)/this.points*100);
    document.getElementById( 'result-string-1' ).innerHTML = wpm;
    document.getElementById( 'result-string-2' ).innerHTML = accuracy;

    document.getElementById("start-game").style.display = "block";
    document.getElementById("keyboard-div").style.display = "block";
    // document.getElementById("my-canvas-keyboard").style.display = "block";
    document.getElementById("game-over-dialog-box").style.display = "block";
    //If they've played once already, they don't need to keep seeing the instructions
    document.getElementById("instructions-box").style.display = "none";

    //Map result onto keyboard heat map
    TypingFrenzy.KeyboardHeatMap.overlayColoredRectanglesOnBadKeys(this);
    // Prevent ship from firing after game ends
    window.currentGameView.unbindKeys();
  };

  Game.prototype.startTimer = function () { // put this in utils
    function countdown( elementName, minutes, seconds, game )
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
                game.gameOverActions();
            } else {
                time = new Date( msLeft );
                hours = time.getUTCHours();
                mins = time.getUTCMinutes();
                element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
                setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
                //test
                // var e = $.Event("keydown", { keyCode: 35}); //"keydown" if that's what you're doing
                // $("body").trigger(e);
            }
        }
        element = document.getElementById( elementName );
        endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
        updateTimer();
    }
    countdown( "countdown", 0, this.gameTimeInSec, this ); // Make this a global

  };

  Game.prototype.wrap = function (pos) {
    return [
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
    ];

    function wrap (coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };
})();
