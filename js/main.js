'use strict';
// связывает другие модули
(function () {
  // var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  // Получаем случайное число
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Получаем случайный элемент массива
  var getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  };

  // Перемешивание массива
  var shuffleObjects = function (array) {
    var shuffledObject = array.slice();
    for (var i = shuffledObject.length - 1; i > 0; i--) {
      var joinElement = getRandomNumber(0, i);
      var buffer = shuffledObject[i];
      shuffledObject[i] = shuffledObject[joinElement];
      shuffledObject[joinElement] = buffer;
    }
    return shuffledObject;
  };

  // Возвращает массив случайной длины методом слайс и сокращаем
  var getRandomLenght = function (array) {
    var randomLenght = shuffleObjects(array);
    return randomLenght.slice(0, getRandomNumber(1, array.length));
  };

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

  // обработчики событий
  var onHandlerMouseDown = function (evt) {
    if (evt.which === 1) {
      evt.preventDefault();
      window.form.activePage();
    }
  };

  var onHandlerKeyDown = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.map.closeCard();
      window.form.activePage();
    }
  };

  var onHandlerEscDown = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.map.closeCard();
    }
  };

  window.main = {
    getRandomElement: getRandomElement,
    getRandomLenght: getRandomLenght,
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad,
    onHandlerMouseDown: onHandlerMouseDown,
    onHandlerKeyDown: onHandlerKeyDown,
    onHandlerEscDown: onHandlerEscDown
  };
})();


