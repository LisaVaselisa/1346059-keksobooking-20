'use strict';
// связывает другие модули

(function () {
  // обработчики событий
  var onHandlerMouseDown = function (evt) {
    evt.preventDefault();
    if (evt.which === 1) {
      window.form.activePage();
    }
  };

  var onHandlerKeyDown = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      window.map.closeCard();
      window.form.activePage();
    }
  };


  var onHandlerEscDown = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      window.map.closeCard();
    }
  };

  window.main = {
    onHandlerMouseDown: onHandlerMouseDown,
    onHandlerKeyDown: onHandlerKeyDown,
    onHandlerEscDown: onHandlerEscDown
  };

})();


