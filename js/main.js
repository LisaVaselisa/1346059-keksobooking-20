'use strict';
// связывает другие модули
(function () {
  // обработчики событий
  var MouseDownHandler = function (evt) {
    if (evt.which === 1) {
      evt.preventDefault();
      window.form.activePage();
    }
  };

  var KeyDownHandler = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.map.removeCard();
      window.form.activePage();
    }
  };

  var EscDownHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.map.removeCard();
    }
  };

  window.main = {
    MouseDownHandler: MouseDownHandler,
    KeyDownHandler: KeyDownHandler,
    EscDownHandler: EscDownHandler
  };
})();


