'use strict';

(function () {
  // обработчики событий
  var mouseDownHandler = function (evt) {
    if (evt.which === 1) {
      evt.preventDefault();
      window.form.activatePage();
    }
  };

  var keyDownHandler = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.map.removeCard();
      window.form.activatePage();
    }
  };

  var escDownHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.map.removeCard();
    }
  };

  window.main = {
    mouseDownHandler: mouseDownHandler,
    keyDownHandler: keyDownHandler,
    escDownHandler: escDownHandler
  };
})();


