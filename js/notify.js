'use strict';
//  отвечает за вывод сообщений об отправки формы

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  // Обработчики ошибок
  var onEscErrorHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeError();
    }
  };
  var onClickErrorHandler = function (evt) {
    if (evt.target === document.querySelector('div.error')) {
      evt.preventDefault();
      removeError();
    }
  };

  var ClickButtonHandler = function () {
    removeError();
  };

  var removeError = function () {
    document.querySelector('div.error').remove();
    document.removeEventListener('keydown', onEscErrorHandler);
    document.removeEventListener('click', onClickErrorHandler);
    document.removeEventListener('click', ClickButtonHandler);
  };

  // Сообщения об ошибке
  var showError = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    var messageError = errorElement.querySelector('.error__message');
    messageError.textContent = errorMessage;

    var message = document.querySelector('main').appendChild(errorTemplate);
    var errorButton = message.querySelector('.error__button');
    document.addEventListener('keydown', onEscErrorHandler);
    document.addEventListener('click', onClickErrorHandler);
    errorButton.addEventListener('click', ClickButtonHandler);
  };

  var onSuccessLoad = function (data) {
    window.form.savePins(data);
    // window.filter.getFilterPins(data);
    // window.form.filteredPins(data);
  };

  var onErrorLoad = function (message) {
    showError(message);
  };

  var removeSuccess = function () {
    document.querySelector('div.success').remove();
    document.removeEventListener('keydown', EscSuccessHandler);
    document.removeEventListener('click', ClickSuccessHandler);
    window.form.deactivePage();
  };

  // Обработчик при удачной отправки
  var EscSuccessHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeSuccess();
    }
  };

  var ClickSuccessHandler = function (evt) {
    if (evt.target === document.querySelector('div.success')) {
      evt.preventDefault();
      removeSuccess();
    }
  };

  var showSuccess = function (successMessage) {
    var successElement = successTemplate.cloneNode(true);
    var messageSuccess = successElement.querySelector('.success__message');
    messageSuccess.textContent = successMessage;
    document.querySelector('main').appendChild(successTemplate);
    document.addEventListener('keydown', EscSuccessHandler);
    document.addEventListener('click', ClickSuccessHandler);
  };

  var onSuccessUpload = function () {
    showSuccess();
  };

  var onErrorUpload = function (message) {
    showError(message);
  };

  window.notify = {
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad,
    onSuccessUpload: onSuccessUpload,
    onErrorUpload: onErrorUpload,

  };
})();
