'use strict';

window.util = (function() {
  var MESSAGE_SHOW_TIME = 5000;

  var getMessageElement = function(message) {
    var element = document.createElement('div');

    element.style.position = 'absolute';
    element.style.left = 0;
    element.style.right = 0;
    element.style.zIndex = 100;

    element.style.margin = '0 auto';
    element.style.textAlign = 'center';
    element.style.fontSize = '30px';

    element.textContent = message;
    return element;
  };

  var showMessageElement = function(element) {
    document.body.prepend(element);
    setTimeout(function() {
      element.remove();
    }, MESSAGE_SHOW_TIME);
  };

  return {
    isEscEvent: function(evt, action) {
      if (evt.key === 'Escape') {
        action();
      }
    },

    isEnterEvent: function(evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    },

    networkSuccessHandler: function(message) {
      var element = getMessageElement(message);
      element.style.backgroundColor = '#00bb00';
      element.style.outline = '1px solid #777777';
      showMessageElement(element);
    },

    networkErrorHandler: function(message) {
      var element = getMessageElement(message);
      element.style.backgroundColor = '#ff0000';
      showMessageElement(element);
    },
  };
})();
