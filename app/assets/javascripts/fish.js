(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var Fish = TypingFrenzy.Fish = function (options) {

    this.ctx = options.game.ctx

    this.game = options.game;
    this.text = options.text;
    this.textOffset = 0;
    this.wordWidth = 0;
    this.bufferedWordWidth = 0;
    this.removedChars = '';

    this.fontSize = 24;
    this.strFontSize = String(this.fontSize);
    this.font = this.strFontSize.concat('px Arial');
    this.ctx.font= this.font;

    this.fishDirection = '';
    this.active = false;

    this.imageHeight = 50;
    this.imageMinWidth = 100;
    this.imageMaxWidth = 400;
    this.imageWidthIncrement = 25;
    this.fishWidthBuffer = 110;
    this.imageWidth = 0;

    // Create a hash of images, using their file size parameters as seeds.
    this.fishRightImagesHash = {};
    this.fishLeftImagesHash = {};
    for (var width = this.imageMinWidth; width <= this.imageMaxWidth; width += this.imageWidthIncrement) {
      var relativePath = 'assets/fish/';

      var imageName = "yellow_fish_right_" + width + "x50.png";
      var newImageRight = new Image();
      newImageRight.src= relativePath + imageName;
      this.fishRightImagesHash[width] = newImageRight;

      var imageName = "yellow_fish_left_" + width + "x50.png";
      var newImageLeft = new Image();
      newImageLeft.src= relativePath + imageName;
      this.fishLeftImagesHash[width] = newImageLeft;
    };

    // this.pos = options.game.randomPosition();
    this.pos = [0,0];
    this.createFishStartPos();
    options.pos = this.pos; // Why do I need to put this in options? Who reads it from options?  #move?
    // options.pos = options.game.randomPosition();

//fuck this shit
    this.createFishStartPos();
    this.createFishStartDirection();

    options.vel = this.vel; // Why is this here?

    this.x = 0;
    this.y = 0;

    TypingFrenzy.MovingObject.call(this, options);
  };

  TypingFrenzy.Util.inherits(Fish, TypingFrenzy.MovingObject);
  Fish.prototype.isWrappable = false;

  Fish.prototype.createFishStartPos = function () {
    this.calcBestImageWidth();
    this.fishBoundaryLeft = -this.imageWidth;
    this.fishBoundaryRight = TypingFrenzy.Game.DIM_X + this.imageWidth;

    var height = TypingFrenzy.Game.DIM_Y;

    //  If fish is too close vertically to an existing fish, try again.
    var fishTooClose = true;
    var minYDistance = 100;

    while (fishTooClose){
      // Pick a new y position.
      var fishList = this.game.fishes;
      var newY = Math.random() * height * 0.75 + height * 0.05 ;
      fishTooClose = false;

      // Check new y position against existing y positions.
      for (i = 0; i < fishList.length; i++) {
        var existingFishY = this.game.fishes[i].pos[1]
        if ( Math.abs(newY - existingFishY) < minYDistance) {
          fishTooClose = true;
          break;
        };
      };

    };
    this.pos[1] = newY;
  };

  Fish.prototype.createFishStartDirection = function () {
    var velX = Math.random() * 1 + 4;
    var direction = Math.random() * 2 -1;
    if (direction > 0){
      this.pos[0] = this.fishBoundaryLeft;
      this.vel = [velX,0];
      this.fishDirection = 'right';
    } else {
      this.pos[0] = this.fishBoundaryRight;
      this.vel = [-velX,0];
      this.fishDirection = 'left';
    };

  };

  Fish.prototype.removeChar = function () {
      this.removedChars += this.text[0];
      this.text = this.text.substr(1);
  };

  Fish.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.x = this.pos[0];
    this.y = this.pos[1];
  };

  Fish.prototype.calcBestImageWidth = function(){
    // Determine which image fits the text closest
    // Account for zones on head and tail where you can't write.
    this.wordWidth = this.ctx.measureText(this.text).width;
    this.bufferedWordWidth = this.wordWidth + this.fishWidthBuffer;
    this.imageWidth = this.bufferedWordWidth - this.bufferedWordWidth % this.imageWidthIncrement;
    if (this.imageWidth < this.imageMinWidth){ this.imageWidth = this.imageMinWidth};
    if (this.imageWidth > this.imageMaxWidth){ this.imageWidth = this.imageMaxWidth};
  };

  Fish.prototype.flipDirection = function(){
    // If you are going left and you hit the wall, reverse direction
    // and change the image
    if (this.pos[0] < 0 + this.imageWidth/2 && this.vel[0] < 0){
      this.vel[0] *= -1;
      this.fishDirection = 'right';
    }
    if (this.pos[0] > TypingFrenzy.Game.DIM_X  - this.imageWidth/2 && this.vel[0] > 0){
      this.vel[0] *= -1;
      this.fishDirection = 'left';
    }
  }

  Fish.prototype.selectImage = function(){
      if (this.fishDirection === 'right'){
        this.image = this.fishRightImagesHash[this.imageWidth];
        this.textOffset = 0.4 * this.fishWidthBuffer;
      };
      if (this.fishDirection === 'left'){
        this.image = this.fishLeftImagesHash[this.imageWidth];
        this.textOffset = 0.4 * this.fishWidthBuffer;
      };
  };

  Fish.prototype.drawImage = function(){
    this.ctx.drawImage(this.image, this.x - this.imageWidth/2, this.y - this.imageHeight/2);
  };

  Fish.prototype.drawBackgroundBox = function (){
    // Draw a colored box behind text if fish is active.
    var boxBuffer = 6;
    if (this.game.activeFish === this.game.fishes.indexOf(this)) {
      this.ctx.fillStyle="white";

      var x = this.x - this.imageWidth/2 + this.textOffset - boxBuffer/2;
      var yAdjust = -2;
      var y = this.y - this.fontSize/2 + yAdjust;
      var width = this.wordWidth + boxBuffer;
      var height = this.fontSize + 4;
      var radius = 3

      TypingFrenzy.Util.roundRect(this.ctx, x, y, width, height, 5, true);
    }
  };

  Fish.prototype.drawText = function(){
    // Add space to account for removed letters, so remaining
    // letters do not slide to the left
    var removedCharWidth = this.ctx.measureText(this.removedChars).width;
    this.ctx.fillStyle = 'black';
    var yAdjust = -5;
    var x = removedCharWidth + this.x - this.imageWidth/2 + this.textOffset;
    var y = this.y + this.fontSize/2 + yAdjust;
    this.ctx.fillText(this.text, x, y);
  };

  Fish.prototype.draw = function () {
    this.flipDirection();
    this.changeSpeed(); // not implemented
    this.selectImage();
    this.drawImage();
    this.drawBackgroundBox();
    this.drawText();
  };

  Fish.prototype.collideWith = function (otherObject) {
    // Clear parent function.
  };

  Fish.prototype.changeSpeed = function(){
    // var fasterOrSlower = (parseInt(Math.random() * 4) - 3);
    // if (Math.random() * 20 < 1) {
    //   this.vel[0] *= 1.1 ;
    // };
  };
  // }

})();
