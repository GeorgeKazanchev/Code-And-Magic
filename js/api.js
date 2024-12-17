'use strict';

window.api = (function() {
  var BASE_URL = 'http://localhost:3000';
  var TIMEOUT = 5000;
  var STATUS_OK = 200;

  var getXHR = function(onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function() {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('timeout', function() {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.addEventListener('error', function() {
      onError('Произошла ошибка соединения');
    });

    return xhr;
  };

  return {
    load: function(onLoad, onError) {
      var xhr = getXHR(onLoad, onError);
      xhr.open('GET', BASE_URL + '/data');
      xhr.send();
    },

    save: function(data, onLoad, onError) {
      var xhr = getXHR(onLoad, onError);
      xhr.open('POST', BASE_URL + '/');
      xhr.send(data);
    },
  };
})();
