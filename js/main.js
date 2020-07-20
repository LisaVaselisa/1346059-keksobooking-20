'use strict';
// связывает другие модули
(function () {
  // обработчики событий
  var onMouseDownHandler = function (evt) {
    if (evt.which === 1) {
      evt.preventDefault();
      window.form.activePage();
    }
  };

  var onKeyDownHandler = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.map.removeCard();
      window.form.activePage();
    }
  };

  var onEscDownHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.map.removeCard();
    }
  };

  window.main = {
    // getRandomElement: getRandomElement,
    // getRandomLenght: getRandomLenght,
    onMouseDownHandler: onMouseDownHandler,
    onKeyDownHandler: onKeyDownHandler,
    onEscDownHandler: onEscDownHandler
  };
})();


