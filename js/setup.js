'use strict';

(function() {
  var formElement = document.querySelector('.setup-wizard-form');
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

  formElement.addEventListener('submit', function(evt) {
    evt.preventDefault();

    var wizardSvgElement = document.querySelector('.wizard-svg').cloneNode(true);
    wizardSvgElement.querySelector('#wizard-coat').style.fill = wizard.coatColor;
    wizardSvgElement.querySelector('#wizard-eyes').style.fill = wizard.eyesColor;

    var wizardBase64Right = window.svg2base64(wizardSvgElement);

    wizardSvgElement.querySelector('#wizard').style.transform = 'translate(62px, 0) scale(-1, 1)';

    var wizardBase64Left = window.svg2base64(wizardSvgElement);

    window.restartGame(wizardBase64Right, wizardBase64Left);
  });

  window.myWizard = wizard;
})();
