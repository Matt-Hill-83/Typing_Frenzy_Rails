(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var KeyboardHeatMap = TypingFrenzy.KeyboardHeatMap = function(){
  };

  var createKeyboardRectangles = KeyboardHeatMap.createKeyboardRectangles = function(){
    var rectanglesHash = [];

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
    row_5_chars = ['ctrl', 'option', 'cmd', 'space','cmd', 'option', 'ctrl'];

    this.keyboardChars = [];
    this.keyboardChars.push(row_1_chars);
    this.keyboardChars.push(row_2_chars);
    this.keyboardChars.push(row_3_chars);
    this.keyboardChars.push(row_4_chars);
    this.keyboardChars.push(row_5_chars);

    this.rowHeights = [29, 29, 29, 29,33];

    var xOffset = 8;
    var yOffset = 4;

    var xInterKeySpacing = 4.6;
    var yInterKeySpacing = 3.3;
    var totalY = yOffset;

    for (j = 0; j < this.keyboardRectangleWidths.length; j++){
      // Get the array of key widths
      var keyboardRowArray = this.keyboardRectangleWidths[j];
      keyHeight = this.rowHeights[j];
      var yKeyPlusSpacing = yInterKeySpacing + keyHeight;

      var totalX = xOffset;
      for (i = 0; i < keyboardRowArray.length; i++){
        keyWidth = keyboardRowArray[i]
        var xKeyPlusSpacing = xInterKeySpacing + keyWidth;

        var newRect = [totalX ,totalY,keyWidth,keyHeight];
        rectanglesHash[this.keyboardChars[j][i]] = (newRect);
        totalX += xKeyPlusSpacing;

      }; // for i
      totalY += yKeyPlusSpacing;
    }; // for j
    return rectanglesHash;
  };

  var drawKeyboardRectangles = KeyboardHeatMap.drawKeyboardRectangles = function(game){
    ctx_kbd = game.ctx_kbd;

    var image_kbd=new Image();
    image_kbd.src= "assets/keyboard/QWERTY_500x176.png";
    ctx_kbd.drawImage(image_kbd, 0, 0);

    var badString = "abcde"
    console.log('str length' + badString.length);


    var rectanglesHash = this.createKeyboardRectangles();
    var rectanglesArray = _.pairs(rectanglesHash);

    for (i = 0; i < badString.length; i++ ) {
      console.log('bad rects' + rectanglesHash[badString[i]]);

        var rectangle = rectanglesHash[badString[i]];

        var x = rectangle[0]
        var y = rectangle[1]
        var width = rectangle[2]
        var height = rectangle[3]

        ctx_kbd.rect( x,y,width,height);
        ctx_kbd.stroke();
        ctx_kbd.font="10px Georgia";
        ctx_kbd.fillText(badString[i],x + 5,y + 10);
    };

  };

  // For testing, not for production use
  var drawAllKeyboardRectangles = KeyboardHeatMap.drawAllKeyboardRectangles = function(game){
    ctx_kbd = game.ctx_kbd;

    var image_kbd=new Image();
    image_kbd.src= "assets/keyboard/QWERTY_500x176.png";
    ctx_kbd.drawImage(image_kbd, 0, 0);

    var rectanglesHash = this.createKeyboardRectangles();
    var rectanglesArray = _.pairs(rectanglesHash);

    for (j = 0; j < rectanglesArray.length; j++){
        var rectangle = rectanglesArray[j][1];

        var x = rectangle[0]
        var y = rectangle[1]
        var width = rectangle[2]
        var height = rectangle[3]

        ctx_kbd.rect( x,y,width,height);
        ctx_kbd.stroke();
        ctx_kbd.font="10px Georgia";
        ctx_kbd.fillText(rectanglesArray[j][0],x + 5,y + 10);
    }; // for j
  };

})();
