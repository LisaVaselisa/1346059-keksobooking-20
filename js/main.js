'use strict';
// связывает другие модули
(function () {

  // // Получаем случайное число
  // var getRandomNumber = function (min, max) {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // };

  // // Получаем случайный элемент массива
  // var getRandomElement = function (array) {
  //   return array[getRandomNumber(0, array.length - 1)];
  // };

  // // Перемешивание массива
  // var shuffleObjects = function (array) {
  //   var shuffledObject = array.slice();
  //   for (var i = shuffledObject.length - 1; i > 0; i--) {
  //     var joinElement = getRandomNumber(0, i);
  //     var buffer = shuffledObject[i];
  //     shuffledObject[i] = shuffledObject[joinElement];
  //     shuffledObject[joinElement] = buffer;
  //   }
  //   return shuffledObject;
  // };

  // // Возвращает массив случайной длины методом слайс и сокращаем
  // var getRandomLenght = function (array) {
  //   var randomLenght = shuffleObjects(array);
  //   return randomLenght.slice(0, getRandomNumber(1, array.length));
  // };


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
    // getRandomElement: getRandomElement,
    // getRandomLenght: getRandomLenght,
    onHandlerMouseDown: onHandlerMouseDown,
    onHandlerKeyDown: onHandlerKeyDown,
    onHandlerEscDown: onHandlerEscDown
  };
})();


