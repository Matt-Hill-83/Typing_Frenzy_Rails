(function () {
  if (typeof TypingFrenzy === "undefined") {
    window.TypingFrenzy = {};
  }

  var Util = TypingFrenzy.Util = function(){
    // this.wordLists = "a";

  };

  // Normalize the length of the vector to 1, maintaining direction.
  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

  // Find distance between two points.
  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  // Find the length of the vector.
  var norm = Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  // Return a randomly oriented vector with the given length.
  var randomVec = Util.randomVec = function (length) {
    var rad = 2 * Math.PI * Math.random();
    // var rad = 2 * Math.PI * Math.random() * 0.25;

    return scale([0, 1], length);
    // return scale([Math.sin(rad), Math.cos(rad)], length);
  };

  // Scale the length of a vector by the given amount.
  var scale = Util.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };

  var shiftedKeys = Util.shiftedKeys = function (pressedKey) {
    var myShiftedKeys = {
      'a': 'A',
      'b': 'B',
      'c': 'C',
      'd': 'D',
      'e': 'E',
      'f': 'F',
      'g': 'G',
      'h': 'H',
      'i': 'I',
      'j': 'J',
      'k': 'K',
      'l': 'L',
      'm': 'M',
      'n': 'N',
      'o': 'O',
      'p': 'P',
      'q': 'Q',
      'r': 'R',
      's': 'S',
      't': 'T',
      'u': 'U',
      'v': 'V',
      'w': 'W',
      'x': 'X',
      'y': 'Y',
      'z': 'Z',
      '`': '~',
      '1': '!',
      '2': '@',
      '3': '#',
      '4': '$',
      '5': '%',
      '6': '^',
      '7': '&',
      '8': '*',
      '9': '(',
      '0': ')',
      '-': '_',
      '=': '+',
      '[': '{',
      ']': '}',
      '\\': '|', //need to fix this
      ';': ':',
      '\'': '\"',
      ',': '<',
      '.': '>',
      '/': '?'
    };
    return myShiftedKeys[pressedKey];
  };

  var inherits = Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
  // Draw a rectangle with rounded corners.
  var roundRect = Util.roundRect = function (ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined" ) {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
      ctx.stroke();
    }
    if (fill) {
      ctx.fill();
    }
  };



  // //Get new word list.
  // var wordList = Util.wordList = function (listNum) {
  //   return wordLists[listNum];
  // };
  //Get word list from word list hash.
  var getWordListFromListsHash = Util.getWordListFromListsHash = function (listName) {
    return wordListsHash[listName];
  };
  // Create new text for fish from current word list.
  var newText = Util.newText = function (wordList) {
    TypingFrenzy.Game.TOTAL_FISH ++;
    return wordList[parseInt(Math.random() * (wordList.length - 1))];
    // return wordList[TypingFrenzy.Game.TOTAL_FISH % wordList.length];

  };

  var Home_Row_00 = ["smile",
               "yes",
               "helps",
               "first",
               "best",
               "join",
               "offer",
               "play",
               "ease",
               "eager",
               "great",
               "astute",
               "easy"
               ];
  var In_Position_01 = ["funny",
               "winner",
               "quick",
               "helps",
               "friend",
               "great",
               "foremost",
               "triumph",
               "pleasant",
               "enjoy",
               "happy",
               "honest",
               "vibrant",
               "vital",
               "vigor",
               "healthy",
               "healthy",
               "relief",
               "bliss",
               "honest",
               "triumph",
               "positive",
               "style",
               "benefit",
               "laugh",
               "laugh",
               "believe",
               "value"
               ];
  // var In_Position_01 = ["funny",
  //              "funny",
  //              "funny",
  //              "funny",
  //              "funny",
  //              "funny",
  //              "funny",
  //              "funny"
  //              ];
 var Out_Of_Position_02 = ["respect",
              "thoughtful",
              "earnest",
              "sharp",
              "purpose",
              "purpose",
              "credibility",
              "excellent"
              ];
  var Stretchers_03 = ["triumphant",
               "elevate",
               "superlative",
               "chocolate",
               "achieve",
               "solid",
               "attuned"
               ];
  var Punctuation_04 = [",cat,",
               "<cat>",
               ".dog.",
               "?what?",
               ":colon:",
               "/forward/",
               ";semi;",
               "|pipe|",
              //  "\\back\\",
               "[bracket]",
               "{curly}",
               "\"double\"",
               "\'single\'"
               ];
  var Numbers_05 = ["19",
               "27",
               "83",
               "37",
               "02",
               "56",
               "72",
               "48",
               "84"
               ];
  var Top_Punctuation_055 = ["!yay!",
               "@the_lake",
               "#laugh",
               "110%",
               "^oo^",
               "m&m",
               "*star*",
               "(paren)",
               "-dash-",
               "_under_",
               "=equal=",
               "+plus+"
               ];
  var HTML_06 = ["</div>",
               "</link>",
               "</form>",
               "</a>",
               "</li>",
               "</img>",
               "</ul>",
               "</nav>",
               "</span>",
               "</head>"
               ];
  var CSS_07 = ["margin: 15px auto;",
               "color: rgb(176,176,176);",
               "-moz-box-shadow:",
               ".navbar-div:hover",
               "width: 900px;",
               "z-index: -20 !important;",
               ".navbar .nav > li > a:hover {"
               ];
  var JavaScript_08 = ["this.fishes = [];",
               "for (var i = 0; i < numFish; i++)",
               "Game.prototype.add",
               "pos: [-1556, 0],",
               "var game = this;",
               "if (obj1 == obj2)",
               "Math.random(),"
               ];
  var Ruby_09 = ["current_user.try(:reset_token!)",
               "attr_reader :password",
               "validates :username,",
               "flash.now[:errors]",
               "git commit -m 'done.'"
               ];
  var Rails_10 = ["foreign_key: :user_id,",
               "get 'static_pages/root'",
               "create_table :robots do |t|",
               "BCrypt::Password.new",
               "name=\"authenticity_token\"",
               "(:user).permit(:password",
               "sign_in(@user)",
               "@user = User.new"
               ];

  var wordListsHash = {};
  wordListsHash['Home_Row_00'] = Home_Row_00;
  wordListsHash['In_Position_01'] = In_Position_01;
  wordListsHash['Out_Of_Position_02'] = Out_Of_Position_02;
  wordListsHash['Stretchers_03'] = Stretchers_03;
  wordListsHash['Punctuation_04'] = Punctuation_04;
  wordListsHash['Numbers_05'] = Numbers_05;
  wordListsHash['Top_Punctuation_055'] = Top_Punctuation_055;
  wordListsHash['HTML_06'] = HTML_06;
  wordListsHash['CSS_07'] = CSS_07;
  wordListsHash['JavaScript_08'] = JavaScript_08;
  wordListsHash['Ruby_09'] = Ruby_09;
  wordListsHash['Rails_10'] = Rails_10;

})();
