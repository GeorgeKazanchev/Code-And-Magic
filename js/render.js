'use strict';

(function() {
  var WIZARDS_COUNT = 4;

  var similarContainerElement = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var render = function(wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT && i < wizards.length; ++i) {
      fragment.append(renderWizard(wizards[i]));
    }
    similarListElement.innerHTML = '';
    similarListElement.append(fragment);
    similarContainerElement.classList.remove('hidden');
  };

  window.render = render;
})();
