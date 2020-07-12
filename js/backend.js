'use strict';
(function () {
  var Url = {
    URL_GET: 'https://javascript.pages.academy/keksobooking/data',
    URL_POST: 'https://javascript.pages.academy/keksobooking'
  };

  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200,
    WRONG_REQUEST: 400,
    NOT_FOUND: 404,
    ERROR_SERVER: 500
  };

  var createLoad = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case StatusCode.WRONG_REQUEST:
          onError('Ошибка: неверный запрос');
          break;
        case StatusCode.NOT_FOUND:
          onError('Ошибка: запрос не найден');
          break;
        case StatusCode.ERROR_SERVER:
          onError('Ошибка сервера');
          break;
        default:
          onError('Произошла ошибка сервера: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за' + TIMEOUT_IN_MS + 'мс');
    });
    return xhr;
  };

  // Отправка запроса на сервер
  var loadData = function (onSuccess, onError) {
    var xhr = createLoad(onSuccess, onError);
    xhr.open('GET', Url.URL_GET);
    xhr.send();
  };

  // Отправка данных на сервер
  var uploadData = function (data, onSuccess, onError) {
    var xhr = createLoad(onSuccess, onError);
    xhr.open('POST', Url.URL_POST);
    xhr.send(data);
  };

  window.backend = {
    loadData: loadData,
    uploadData: uploadData
  };
})();
