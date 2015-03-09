(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }


  var KeyboardHeatMap = TypingFrenzy.KeyboardHeatMap = function(){
  };


  var drawKeyboardRectangles = KeyboardHeatMap.drawKeyboardRectangles = function(game){
    ctx_kbd = game.ctx_kbd;

    this.image_kbd=new Image();
    this.image_kbd.src= "assets/keyboard/QWERTY_500x176.png";
    ctx_kbd.drawImage(this.image_kbd, 0, 0);
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

        ctx_kbd.rect( totalX ,totalY,keyWidth,keyHeight);
        totalX += xKeyPlusSpacing;

        ctx_kbd.stroke();
      }; // for i
      totalY += yKeyPlusSpacing;
    }; // for j
  };

})();
