'use strict';

(function() {
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

  var coatElement = document.querySelector('.setup-wizard .wizard-coat');
  var eyesElement = document.querySelector('.setup-wizard .wizard-eyes');
  var fireballElement = document.querySelector('.setup-fireball-wrap');

  var coatInputElement = document.querySelector('input[name="coat-color"]');
  var eyesInputElement = document.querySelector('input[name="eyes-color"]');
  var fireballInputElement = document.querySelector('input[name="fireball-color"]');

  var selectNextColor = function(colorsArray, currentColor) {
    var currentColorIndex = colorsArray.indexOf(currentColor);
    return (currentColorIndex >= 0 && currentColorIndex < colorsArray.length - 1)
      ? colorsArray[currentColorIndex + 1]
      : colorsArray[0];
  };

  coatElement.addEventListener('click', function(evt) {
    var target = evt.target;
    var currentColor = target.style.fill;
    target.style.fill = selectNextColor(COAT_COLORS, currentColor);
    coatInputElement.value = target.style.fill;
  });

  eyesElement.addEventListener('click', function(evt) {
    var target = evt.target;
    var currentColor = target.style.fill;
    target.style.fill = selectNextColor(EYES_COLORS, currentColor);
    eyesInputElement.value = target.style.fill;
  });

  fireballElement.addEventListener('click', function(evt) {
    var target = evt.currentTarget;
    var currentColor = target.style.backgroundColor;
    target.style.backgroundColor = selectNextColor(FIREBALL_COLORS, currentColor);
    fireballInputElement.value = target.style.backgroundColor;
  });
})();
