(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var BackgroundLayer = TypingFrenzy.BackgroundLayer = function (options) {

    options.pos = options.pos || [0,0];
    options.vel = options.vel || [1, -2];

    this.file = options.file;
    this.bg_vel = options.bg_vel;
    this.y = 0;
    this.x = options.pos[0];
    this.maxX = options.maxX;
    this.image = new Image()
    this.image.src= this.file

    TypingFrenzy.MovingObject.call(this, options);
  };

  BackgroundLayer.SPEED = 500;

  TypingFrenzy.Util.inherits(BackgroundLayer, TypingFrenzy.MovingObject);

  BackgroundLayer.prototype.draw = function (ctx) {
    this.x += this.bg_vel[0];
    this.y += this.bg_vel[1];
    if (this.x > this.maxX) { this.x = this.pos[0]; this.y = 0 };
    ctx.drawImage(this.image, this.x, this.y);

  };

  BackgroundLayer.prototype.move = function () {
    // todo: push my .draw logic in here so I can use the same conventions as the other objects
    // this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

  };
})();
