'use strict';
//  отвечает за вывод сообщений об отправки формы

(function () {
  // var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');


  // Обработчики ошибок
  var onHandlerEscError = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeError();
    }
  };
  var onHandlerClickError = function (evt) {
    if (evt.target === document.querySelector('div.error')) {
      evt.preventDefault();
      removeError();
    }
  };

  var onHandlerClickButton = function () {
    removeError();
  };

  var removeError = function () {
    document.querySelector('div.error').remove();
    document.removeEventListener('keydown', onHandlerEscError);
    document.removeEventListener('keydown', onHandlerClickError);
    document.removeEventListener('click', onHandlerClickButton);
  };

  // Сообщения об ошибке

  var closeError = function (errorMessage) {
    var messageError = errorTemplate.cloneNode(true);
    var message = document.querySelector('main').appendChild(errorTemplate);
    var messageText = messageError.querySelector('.error__message');
    messageText.textContent = errorMessage;

    var errorButton = message.querySelector('.error__button');
    document.addEventListener('keydown', onHandlerEscError);
    document.addEventListener('click', onHandlerClickError);
    errorButton.addEventListener('click', onHandlerClickButton);
  };

  var onSuccessLoad = function (data) {
    // window.pin.renderNewPin(data);
    window.form.savePins(data);
  };

  var onErrorLoad = function (message) {
    closeError(message);
  };

  window.notify = {
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad,
  };
})();
