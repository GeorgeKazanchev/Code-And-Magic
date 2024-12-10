'use strict';

var setupElement = document.querySelector('.setup');
var draggableElement = setupElement.querySelector('.upload');
var avatarUploadElement = draggableElement.querySelector('input[type="file"]');

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
