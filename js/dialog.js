'use strict';

var setupElement = document.querySelector('.setup');
var draggableElement = setupElement.querySelector('.upload');
var avatarUploadElement = draggableElement.querySelector('input[type="file"]');
var artifactElement = setupElement.querySelector('.setup-artifacts-cell img');

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

var setDefaultPosition = function(elem) {
  elem.style.left = '';
  elem.style.top = '';
};

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
