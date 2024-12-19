'use strict';

(function() {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function(func) {
    var timeout = null;

    return function() {
      var args = arguments;

      if (timeout) {
        window.clearTimeout(timeout);
      }

      timeout = window.setTimeout(function() {
        func.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
