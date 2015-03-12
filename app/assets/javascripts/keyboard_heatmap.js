(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var KeyboardHeatMap = TypingFrenzy.KeyboardHeatMap = function(){
  };

  // Use the string of bad characters to create a heatmap on of problem areas
  // on the keyboard image.
  var drawKeyboardRectangles = KeyboardHeatMap.drawKeyboardRectangles = function(game){
    this.game = game;
    this.ctx_kbd = this.game.ctx_kbd;
    this.badString = this.game.wrongLettersString;


    // Create the locations and dimensions of each rectangle to be overlaid on the keyboard.
    this.createKeyboardRectangles();
    // Create a has that maps each rectangle to its corresponding key.
    this.createRectanglesHash();

    var image_kbd=new Image();
    image_kbd.src= "assets/keyboard/QWERTY_500x176.png";
    this.ctx_kbd.drawImage(image_kbd, 0, 0);

    // Display screen objects.
    this.displayObjects(this.game);
  };

  var displayObjects = KeyboardHeatMap.displayObjects = function(){
    this.drawNoMistakesMessage();

    for (i = 0; i < this.badString.length; i++ ) {
      var rectangle = this.rectanglesHash[this.badString[i]];

      this.x = rectangle[0]
      this.y = rectangle[1]
      this.width = rectangle[2]
      this. height = rectangle[3]

      this.drawRectangle();


      this.ctx_kbd.stroke();
      this.ctx_kbd.font="10px Futura";
      this.ctx_kbd.fillStyle = "rgb(100,100,100)";

      var capitalizedLetter = this.badString[i].toUpperCase();
      var wordWidth = this.ctx_kbd.measureText(capitalizedLetter).width;

      this.ctx_kbd.fillText(capitalizedLetter,this.x + this.width/2 - wordWidth/2,this.y + 19);
    }; // end for loop

  };

  var drawRectangle = KeyboardHeatMap.drawRectangle = function() {
    this.ctx_kbd.fillStyle = "#F57258";
    this.ctx_kbd.fillRect( this.x,this.y,this.width,this. height);
    this.ctx_kbd.strokeStyle = "rgb(100,100,100)";
    TypingFrenzy.Util.roundRect(this.ctx_kbd, this.x, this.y, this.width, this. height, 5, true);
  };

  var drawNoMistakesMessage = KeyboardHeatMap.drawNoMistakesMessage = function (){
    // If there are no mistakes, show the 'no mistakes' message.
    if (this.badString.length === 0) {
      document.getElementById("no-mistakes-msg").style.display = "block";
    };
  };

  var createKeyboardRectangles = KeyboardHeatMap.createKeyboardRectangles = function(){
    this.rectanglesHash = [];
    this.rowHeights = [29, 29, 29, 29,33];

    row_1 = [29, 29, 29, 29,29, 29, 29, 29,29, 29, 29, 29, 29, 49];
    row_2 = [47, 29, 29, 29,29, 29, 29, 29,29, 29, 29, 29, 29, 29];
    row_3 = [55, 29, 29, 29,29, 29, 29, 29,29, 29, 29, 29, 56];
    row_4 = [70, 29, 29, 29, 31, 29, 29, 29,29, 29, 29, 75];
    row_5 = [29, 29, 29, 38,165, 36, 29];

    this.keyboardRectangleWidths = [];
    this.keyboardRectangleWidths.push(row_1);
    this.keyboardRectangleWidths.push(row_2);
    this.keyboardRectangleWidths.push(row_3);
    this.keyboardRectangleWidths.push(row_4);
    this.keyboardRectangleWidths.push(row_5);

    row_1_chars = ['bt', '1', '2', '3','4', '5', '6', '7','8', '9', '0', '-', '=', 'del'];
    row_2_chars = ['tab', 'q', 'w', 'e','r', 't', 'y', 'u','i', 'o', 'p', 'br1','br2', 'bs'];
    row_3_chars = ['caps', 'a', 's', 'd','f', 'g', 'h', 'j','k', 'l', ';', 'bs', 'ret'];
    row_4_chars = ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm','com', 'per', '/', 'shift'];
    row_5_chars = ['fn','ctrl', 'option', 'cmd', ' ','cmd', 'option', 'ctrl'];

    this.keyboardChars = [];
    this.keyboardChars.push(row_1_chars);
    this.keyboardChars.push(row_2_chars);
    this.keyboardChars.push(row_3_chars);
    this.keyboardChars.push(row_4_chars);
    this.keyboardChars.push(row_5_chars);
  };

  var createRectanglesHash = KeyboardHeatMap.createRectanglesHash = function() {
    this.xOffset = 8;
    this.yOffset = 4;

    this.xInterKeySpacing = 4.6;
    this.yInterKeySpacing = 3.3;
    this.totalY = this.yOffset;

    for (j = 0; j < this.keyboardRectangleWidths.length; j++){
      // Get the array of key widths
      var keyboardRowArray = this.keyboardRectangleWidths[j];
      keyHeight = this.rowHeights[j];
      var yKeyPlusSpacing = this.yInterKeySpacing + keyHeight;

      var totalX = this.xOffset;
      for (i = 0; i < keyboardRowArray.length; i++){
        keyWidth = keyboardRowArray[i]
        var xKeyPlusSpacing = this.xInterKeySpacing + keyWidth;

        var newRect = [totalX ,this.totalY,keyWidth,keyHeight];
        this.rectanglesHash[this.keyboardChars[j][i]] = (newRect);
        totalX += xKeyPlusSpacing;

      }; // for i
      this.totalY += yKeyPlusSpacing;
    }; // for j
  }





})();
