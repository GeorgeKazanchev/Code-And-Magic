'use strict';

var setupElement = document.querySelector('.setup');
setupElement.classList.remove('hidden');

var similarElement = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

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
  'black',
  'red',
  'blue',
  'yellow',
  'green',
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

var wizards = generateWizards();

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; ++i) {
  fragment.append(renderWizard(wizards[i]));
}
similarListElement.append(fragment);

similarElement.classList.remove('hidden');
