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
      var positionTop = Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight);
    } else {
      positionLeft = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
      positionTop = Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight + PIN_MAIN_HEIGHT_ACTIVE);
    }
    window.form.addressInput.value = positionLeft + ', ' + positionTop;
  };

  mapPinMain.addEventListener('mousedown', window.main.onHandlerMouseDown);
  mapPinMain.addEventListener('keydown', window.main.onHandlerKeyDown);

  // Закрываем обработчик нажатия на главный пин при активации карты
  var closehandlerEventListener = function () {
    mapPinMain.removeEventListener('keydown', window.main.onHandlerKeyDown);
    mapPinMain.removeEventListener('mousedown', window.main.onHandlerMouseDown);
  };

  // Готовим элемент к перемещению
  var onMouseDown = function (evt) {
    evt.preventDefault();

    var mapPosition = window.pin.mapElement.getBoundingClientRect();

    // Перемещаем элемент
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getPinMainPosition();

      var result = {
        x: moveEvt.clientX - mapPosition.left,
        y: moveEvt.clientY - mapPosition.top + 60
      };

      // Перемещение главного пина по карте
      mapPinMain.style.top = Math.max(MapLimits.MIN_Y, Math.min(MapLimits.MAX_Y, result.y)) - mapPinMain.offsetHeight - PIN_MAIN_HEIGHT_ACTIVE + 'px';
      mapPinMain.style.left = Math.max(MapLimits.MIN_X, Math.min(locationMaxX, result.x)) - mapPinMain.offsetWidth / 2 + 'px';
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
    getPinMainPosition: getPinMainPosition,
    closehandlerEventListener: closehandlerEventListener
  };
})();
