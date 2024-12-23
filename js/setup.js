'use strict';

(function() {
  var coatElement = document.querySelector('.setup-wizard .wizard-coat');
  var eyesElement = document.querySelector('.setup-wizard .wizard-eyes');
  var fireballElement = document.querySelector('.setup-fireball-wrap');

  var nameInputElement = document.querySelector('.setup-user-name');
  var coatInputElement = document.querySelector('input[name="coat-color"]');
  var eyesInputElement = document.querySelector('input[name="eyes-color"]');
  var fireballInputElement = document.querySelector('input[name="fireball-color"]');

  var updateColor = function(elem, inputElem, color) {
    elem.style.fill = color;
    inputElem.value = color;
  };

  var wizard = new window.Wizard({
    name: nameInputElement.value,
    coatColor: coatElement.style.fill,
    eyesColor: eyesElement.style.fill,
    fireballColor: fireballElement.style.backgroundColor,
  });

  nameInputElement.addEventListener('input', function() {
    wizard.setName(nameInputElement.value);
  });

  coatElement.addEventListener('click', function() {
    var color = wizard.changeCoatColor();
    updateColor(coatElement, coatInputElement, color);
    window.similar.onCoatChange(color);
  });

  eyesElement.addEventListener('click', function() {
    var color = wizard.changeEyesColor();
    updateColor(eyesElement, eyesInputElement, color);
    window.similar.onEyesChange(color);
  });

  fireballElement.addEventListener('click', function() {
    var color = wizard.changeFireballColor();
    fireballElement.style.backgroundColor = color;
    fireballInputElement.value = color;
  });

  window.myWizard = wizard;
})();
