'use strict';

(function() {
  var wizards = [];

  var getRank = function(wizard) {
    var rank = 0;
    if (wizard.coatColor === window.myWizard.coatColor) {
      rank += 2;
    }
    if (wizard.eyesColor === window.myWizard.eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var wizardsComparator = function(left, right) {
    var rankDiff = getRank(right) - getRank(left);
    return rankDiff === 0 ? namesComparator(left.name, right.name) : rankDiff;
  };

  var updateWizards = function() {
    var similarWizards = wizards
      .slice()
      .sort(wizardsComparator);
    window.render(similarWizards);
  };

  //  Создаём 2 функции с отложенным выполнением, чтобы "таймеры"
  //  в этих функциях работали независимо друг от друга
  var updateWizardsByCoatColor = window.debounce(updateWizards);
  var updateWizardsByEyesColor = window.debounce(updateWizards);

  var onCoatChange = function(color) {
    updateWizardsByCoatColor(color);
  };

  var onEyesChange = function(color) {
    updateWizardsByEyesColor(color);
  };

  var loadingSuccessHandler = function(data) {
    wizards = data;
    window.render(wizards);
  };

  window.api.load(loadingSuccessHandler, window.util.networkErrorHandler);

  window.similar = {
    onCoatChange,
    onEyesChange,
  };
})();
