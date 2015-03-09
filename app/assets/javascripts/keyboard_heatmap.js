(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var KeyboardHeatMap = TypingFrenzy.KeyboardHeatMap = function(){
  };

  var createKeyboardRectangles = KeyboardHeatMap.createKeyboardRectangles = function(){
    var rectanglesArray = [];

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

    row_1_chars = ['\`', '1', '2', '3','4', '5', '6', '7','8', '9', '0', '-', '='];
    row_2_chars = ['47', '29', '29', '29','29', '29', '29', '29','29', '29', '29', '29', '29', 29];
    row_3_chars = ['55', '29', '29', '29','29', '29', '29', '29','29', '29', '29', '29', 56];
    row_4_chars = ['70', '29', '29', '29', '31', '29', '29', '29','29', '29', '29'];
    row_5_chars = ['29', '29', '29', '38','165', '36'];

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
      var keyboardRowArray = this.keyboardRectangleWidths[j];
      keyHeight = this.rowHeights[j];
      var yKeyPlusSpacing = yInterKeySpacing + keyHeight;

      var totalX = xOffset;
      for (i = 0; i < keyboardRowArray.length; i++){
        keyWidth = keyboardRowArray[i]
        var xKeyPlusSpacing = xInterKeySpacing + keyWidth;

        var newRect = [totalX ,totalY,keyWidth,keyHeight];
        rectanglesArray.push(newRect);
        totalX += xKeyPlusSpacing;

      }; // for i
      totalY += yKeyPlusSpacing;
    }; // for j
    return rectanglesArray;
  };

  var drawKeyboardRectangles = KeyboardHeatMap.drawKeyboardRectangles = function(game){
    ctx_kbd = game.ctx_kbd;

    var image_kbd=new Image();
    image_kbd.src= "assets/keyboard/QWERTY_500x176.png";
    ctx_kbd.drawImage(image_kbd, 0, 0);

    var rectanglesArray = this.createKeyboardRectangles();
    console.log(rectanglesArray);

    for (j = 0; j < rectanglesArray.length; j++){
        var rectangle = rectanglesArray[j];

        var x = rectangle[0]
        var y = rectangle[1]
        var width = rectangle[2]
        var height = rectangle[3]

        ctx_kbd.rect( x,y,width,height);
        ctx_kbd.stroke();
    }; // for j
  };
})();
