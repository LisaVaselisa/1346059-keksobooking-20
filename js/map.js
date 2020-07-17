'use strict';
// управляет карточками объявлений и метками:
// добавляет на страницу нужную карточку
// отрисовывает метки
// осуществляет взаимодействие карточки и метки на карте

(function () {
  var MapLimits = {MIN_X: 0, MIN_Y: 130, MAX_Y: 630};
  var PIN_MAIN_HEIGHT_ACTIVE = 22;
  var locationMaxX = document.querySelector('.map__overlay').offsetWidth;
  var mapPinMain = document.querySelector('.map__pin--main');

  var getPinMainPosition = function (activeState) {
    if (activeState === true) {
      var positionLeft = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
      var positionTop = Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
    } else {
      positionLeft = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
      positionTop = Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight + PIN_MAIN_HEIGHT_ACTIVE);
    }
    window.form.addressInput.value = positionLeft + ', ' + positionTop;
  };

  var setHandlerEventListener = function () {
    mapPinMain.addEventListener('mousedown', window.main.onMouseDownHandler);
    mapPinMain.addEventListener('keydown', window.main.onKeyDownHandler);
  };

  // Закрываем обработчик нажатия на главный пин при активации карты
  var closehandlerEventListener = function () {
    mapPinMain.removeEventListener('keydown', window.main.onKeyDownHandler);
    mapPinMain.removeEventListener('mousedown', window.main.onMouseDownHandler);
  };

  // Готовим элемент к перемещению
  var onMouseDown = function (evt) {
    evt.preventDefault();

    var mapPosition = window.pin.mapElement.getBoundingClientRect();

    // Перемещаем элемент
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var result = {
        x: Math.max(MapLimits.MIN_X, Math.min(locationMaxX, moveEvt.clientX - mapPosition.left)) - mapPinMain.offsetWidth / 2,
        y: Math.max(MapLimits.MIN_Y, Math.min(MapLimits.MAX_Y, moveEvt.clientY - mapPosition.top)) - mapPinMain.offsetHeight - PIN_MAIN_HEIGHT_ACTIVE
      };

      // Перемещение главного пина по карте
      mapPinMain.style.left = result.x + 'px';
      mapPinMain.style.top = result.y + 'px';
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

  mapPinMain.addEventListener('mousedown', onMouseDown);

  window.map = {
    mapPinMain: mapPinMain,
    setHandlerEventListener: setHandlerEventListener,
    getPinMainPosition: getPinMainPosition,
    closehandlerEventListener: closehandlerEventListener
  };
})();
