'use strict';

(function() {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ];

  var EYES_COLORS = [
    'rgb(0, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(255, 255, 0)',
    'rgb(0, 255, 0)',
  ];

  var FIREBALL_COLORS = [
    'rgb(238, 72, 48)',
    'rgb(48, 168, 238)',
    'rgb(92, 230, 192)',
    'rgb(232, 72, 213)',
    'rgb(230, 232, 72)',
  ];

  var getNextColor = function(colorsArray, currentColor) {
    var currentColorIndex = colorsArray.indexOf(currentColor);
    return (currentColorIndex >= 0 && currentColorIndex < colorsArray.length - 1)
      ? colorsArray[currentColorIndex + 1]
      : colorsArray[0];
  };

  var Wizard = function(data) {
    this.name = data.name;
    this.coatColor = data.coatColor;
    this.eyesColor = data.eyesColor;
    this.fireballColor = data.fireballColor;
  };

  Wizard.prototype = {
    setName: function(name) {
      if (!name) {
        throw new RangeError('Имя мага не задано');
      }

      if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
        throw new RangeError('Имя мага имеет некорректную длину');
      }

      this.name = name;
      return name;
    },

    changeCoatColor: function() {
      var nextColor = getNextColor(COAT_COLORS, this.coatColor);
      this.coatColor = nextColor;
      return nextColor;
    },

    changeEyesColor: function() {
      var nextColor = getNextColor(EYES_COLORS, this.eyesColor);
      this.eyesColor = nextColor;
      return nextColor;
    },

    changeFireballColor: function() {
      var nextColor = getNextColor(FIREBALL_COLORS, this.fireballColor);
      this.fireballColor = nextColor;
      return nextColor;
    },
  };

  window.Wizard = Wizard;
})();
