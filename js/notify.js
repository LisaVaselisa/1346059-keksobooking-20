'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var escErrorHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeError();
    }
  };
  var clickErrorHandler = function (evt) {
    if (evt.target === document.querySelector('div.error')) {
      evt.preventDefault();
      removeError();
    }
  };

  var clickButtonHandler = function () {
    removeError();
  };

  var removeError = function () {
    document.querySelector('div.error').remove();
    document.removeEventListener('keydown', escErrorHandler);
    document.removeEventListener('click', clickErrorHandler);
    document.removeEventListener('click', clickButtonHandler);
  };

  var showError = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    var messageError = errorElement.querySelector('.error__message');
    messageError.textContent = errorMessage;

    var message = document.querySelector('main').appendChild(errorTemplate);
    var errorButton = message.querySelector('.error__button');
    document.addEventListener('keydown', escErrorHandler);
    document.addEventListener('click', clickErrorHandler);
    errorButton.addEventListener('click', clickButtonHandler);
  };

  var onSuccessLoad = function (data) {
    window.form.savePins(data);
    window.form.filteredPins();
  };

  var onErrorLoad = function (message) {
    showError(message);
    window.form.deactivatePage();
  };

  var removeSuccess = function () {
    document.querySelector('div.success').remove();
    document.removeEventListener('keydown', escSuccessHandler);
    document.removeEventListener('click', clickSuccessHandler);
    window.form.deactivatePage();
  };

  var escSuccessHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeSuccess();
    }
  };

  var clickSuccessHandler = function (evt) {
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
    document.addEventListener('keydown', escSuccessHandler);
    document.addEventListener('click', clickSuccessHandler);
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
