'use strict';

var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = document.querySelector('.setup-close');
var setupOpenIconElement = document.querySelector('.setup-open-icon');

var similarElement = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var setupCoatElement = document.querySelector('.setup-wizard .wizard-coat');
var setupEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
var setupFireballElement = document.querySelector('.setup-fireball-wrap');
var setupCoatInput = document.querySelector('input[name="coat-color"]');
var setupEyesInput = document.querySelector('input[name="eyes-color"]');
var setupFireballInput = document.querySelector('input[name="fireball-color"]');

var WIZARDS_COUNT = 4;

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

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

var getRandomArrayItem = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var generateWizards = function() {
  var wizards = [];
  for (var i = 0; i < WIZARDS_COUNT; ++i) {
    wizards.push({
      name: getRandomArrayItem(WIZARD_NAMES) + ' ' + getRandomArrayItem(WIZARD_SURNAMES),
      coatColor: getRandomArrayItem(COAT_COLORS),
      eyesColor: getRandomArrayItem(EYES_COLORS),
    });
  }
  return wizards;
};

var renderWizard = function(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var selectNextColor = function(colorsArray, currentColor) {
  var currentColorIndex = colorsArray.indexOf(currentColor);
  return (currentColorIndex >= 0 && currentColorIndex < colorsArray.length - 1)
    ? colorsArray[currentColorIndex + 1]
    : colorsArray[0];
};

var popupEscPressHandler = function(evt) {
  if (evt.key === 'Escape') {
    if (evt.target.matches('.setup-user-name')) {
      return;
    }

    closePopup();
  }
};

var openPopup = function() {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};

var closePopup = function() {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

setupOpenElement.addEventListener('click', function() {
  openPopup();
});

setupOpenIconElement.addEventListener('keydown', function(evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupCloseElement.addEventListener('click', function() {
  closePopup();
});

setupCloseElement.addEventListener('keydown', function(evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

setupCoatElement.addEventListener('click', function(evt) {
  var target = evt.target;
  var currentColor = target.style.fill;
  target.style.fill = selectNextColor(COAT_COLORS, currentColor);
  setupCoatInput.value = target.style.fill;
});

setupEyesElement.addEventListener('click', function(evt) {
  var target = evt.target;
  var currentColor = target.style.fill;
  target.style.fill = selectNextColor(EYES_COLORS, currentColor);
  setupEyesInput.value = target.style.fill;
});

setupFireballElement.addEventListener('click', function(evt) {
  var target = evt.currentTarget;
  var currentColor = target.style.backgroundColor;
  target.style.backgroundColor = selectNextColor(FIREBALL_COLORS, currentColor);
  setupFireballInput.value = target.style.backgroundColor;
});

var wizards = generateWizards();

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; ++i) {
  fragment.append(renderWizard(wizards[i]));
}
similarListElement.append(fragment);

similarElement.classList.remove('hidden');
