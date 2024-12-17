'use strict';

(function() {
  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');
  var setupOpenIconElement = document.querySelector('.setup-open-icon');

  var draggableElement = setupElement.querySelector('.upload');
  var avatarUploadElement = draggableElement.querySelector('input[type="file"]');
  var artifactElement = setupElement.querySelector('.setup-artifacts-cell img');

  var formElement = document.querySelector('.setup-wizard-form');

  var setDefaultPosition = function(elem) {
    elem.style.left = '';
    elem.style.top = '';
  };

  var popupEscPressHandler = function(evt) {
    if (evt.target.matches('.setup-user-name')) {
      return;
    }
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function() {
    setupElement.classList.remove('hidden');
    setDefaultPosition(setupElement);
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
    window.util.isEnterEvent(evt, openPopup);
  });

  setupCloseElement.addEventListener('click', function() {
    closePopup();
  });

  setupCloseElement.addEventListener('keydown', function(evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  draggableElement.addEventListener('mousedown', function(evt) {
    evt.preventDefault();

    var isDragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var mouseMoveHandler = function(moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      setupElement.style.left = (setupElement.offsetLeft + shift.x) + 'px';
      setupElement.style.top = (setupElement.offsetTop + shift.y) + 'px';
    };

    var mouseUpHandler = function(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (isDragged) {
        var clickPreventDefaultHandler = function(evt) {
          evt.preventDefault();
          avatarUploadElement.removeEventListener('click', clickPreventDefaultHandler);
        };
        avatarUploadElement.addEventListener('click', clickPreventDefaultHandler);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  artifactElement.addEventListener('mousedown', function(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var mouseMoveHandler = function(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      artifactElement.style.position = 'absolute';
      artifactElement.style.zIndex = 1000;
      artifactElement.style.left = (artifactElement.offsetLeft + shift.x) + 'px';
      artifactElement.style.top = (artifactElement.offsetTop + shift.y) + 'px';
    };

    var mouseUpHandler = function(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      artifactElement.hidden = true;
      var elementBelow = document.elementFromPoint(upEvt.clientX, upEvt.clientY);
      artifactElement.hidden = false;

      setDefaultPosition(artifactElement);
      if (elementBelow.matches('.setup-artifacts-cell')) {
        elementBelow.append(artifactElement);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  var savingSuccessHandler = function() {
    closePopup();
    window.util.networkSuccessHandler('Данные успешно загружены на сервер');
  };

  formElement.addEventListener('submit', function(evt) {
    evt.preventDefault();
    var data = new FormData(formElement);
    window.api.save(data, savingSuccessHandler, window.util.networkErrorHandler);
  });
})();
