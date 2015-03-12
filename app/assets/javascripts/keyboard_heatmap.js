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
    ctx_kbd = this.game.ctx_kbd;

    // Create the locations and dimensions of each rectangle to be overlaid on the keyboard.
    this.createKeyboardRectangles();
    // Create a has that maps each rectangle to its corresponding key.
    this.createRectanglesHash();

    var image_kbd=new Image();
    image_kbd.src= "assets/keyboard/QWERTY_500x176.png";
    ctx_kbd.drawImage(image_kbd, 0, 0);

    // Display screen objects.
    this.displayObjects(this.game);
  };

  var displayObjects = KeyboardHeatMap.displayObjects = function(){
    var badString = this.game.wrongLettersString;
    // If there are no mistakes, show the 'no mistakes' message.
    if (badString.length === 0) {
      document.getElementById("no-mistakes-msg").style.display = "block";
    };

    for (i = 0; i < badString.length; i++ ) {
        var rectangle = this.rectanglesHash[badString[i]];

        var x = rectangle[0]
        var y = rectangle[1]
        var width = rectangle[2]
        var height = rectangle[3]

        var r_a = 0.3;
        ctx_kbd.fillStyle = "#F57258";
        ctx_kbd.fillRect( x,y,width,height);
        ctx_kbd.strokeStyle = "rgb(100,100,100)";
        TypingFrenzy.Util.roundRect(ctx_kbd, x, y, width, height, 5, true);

        ctx_kbd.stroke();
        ctx_kbd.font="10px Futura";
        ctx_kbd.fillStyle = "rgb(100,100,100)";

        var capitalizedLetter = badString[i].toUpperCase();
        var wordWidth = ctx_kbd.measureText(capitalizedLetter).width;

        ctx_kbd.fillText(capitalizedLetter,x + width/2 - wordWidth/2,y + 19);
    }; // end for loop

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
