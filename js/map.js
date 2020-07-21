'use strict';
// управляет карточками объявлений и метками:
// добавляет на страницу нужную карточку
// отрисовывает метки
// осуществляет взаимодействие карточки и метки на карте

(function () {
  var PIN_MAIN_HEIGHT_ACTIVE = 22;
  var MapLimits = {MIN_X: 0, MIN_Y: 130, MAX_Y: 630};
  var locationMaxX = document.querySelector('.map__overlay').offsetWidth;
  var pinMain = document.querySelector('.map__pin--main');

  var getPinMainPosition = function (activeState) {
    if (activeState === true) {
      var positionLeft = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2);
      var positionTop = Math.round(pinMain.offsetTop + pinMain.offsetHeight / 2);
    } else {
      positionLeft = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2);
      positionTop = Math.round(pinMain.offsetTop + pinMain.offsetHeight + PIN_MAIN_HEIGHT_ACTIVE);
    }
    window.form.addressForm.value = positionLeft + ', ' + positionTop;
  };

  var setHandlerEventListener = function () {
    pinMain.addEventListener('mousedown', window.main.MouseDownHandler);
    pinMain.addEventListener('keydown', window.main.KeyDownHandler);
  };

  // Закрываем обработчик нажатия на главный пин при активации карты
  var removeHandlerEventListener = function () {
    pinMain.removeEventListener('keydown', window.main.KeyDownHandler);
    pinMain.removeEventListener('mousedown', window.main.MouseDownHandler);
  };

  // Готовим элемент к перемещению
  var onMouseDown = function (evt) {
    evt.preventDefault();

    var mapPosition = window.pin.mapElement.getBoundingClientRect();

    // Перемещаем элемент
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var result = {
        x: Math.max(MapLimits.MIN_X, Math.min(locationMaxX, moveEvt.clientX - mapPosition.left)) - pinMain.offsetWidth / 2,
        y: Math.max(MapLimits.MIN_Y, Math.min(MapLimits.MAX_Y, moveEvt.clientY - mapPosition.top)) - pinMain.offsetHeight - PIN_MAIN_HEIGHT_ACTIVE
      };

      // Перемещение главного пина по карте
      pinMain.style.left = result.x + 'px';
      pinMain.style.top = result.y + 'px';
      getPinMainPosition();
    };

    // Останавливаем перемещение
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinMain.addEventListener('mousedown', onMouseDown);

  window.map = {
    pinMain: pinMain,
    setHandlerEventListener: setHandlerEventListener,
    getPinMainPosition: getPinMainPosition,
    removeHandlerEventListener: removeHandlerEventListener
  };
})();
