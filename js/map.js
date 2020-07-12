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

  // // 5-3 ПЕРЕМЕЩЕНИЕ
  // // главный пин и его перемещение
  // var positionLeft = window.data.mapLimitsMinX - mapPinMain.offsetWidth / 2;
  // var positionRight = window.data.mapLimitsMaxX - mapPinMain.offsetWidth / 2;
  // var positionTop = window.data.mapLimitsMinY - mapPinMain.offsetHeight - PIN_MAIN_HEIGHT_ACTIVE;
  // var positionBottom = window.data.mapLimitsMaxY - mapPinMain.offsetHeight - PIN_MAIN_HEIGHT_ACTIVE;

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var mapPosition = window.pin.mapElement.getBoundingClientRect();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getPinMainPosition();

      var result = {
        y: moveEvt.clientY - mapPosition.top,
        x: moveEvt.clientX - mapPosition.left
      };

      mapPinMain.style.top = Math.max(MapLimits.MIN_Y, Math.min(MapLimits.MAX_Y, result.y)) - mapPinMain.offsetHeight + PIN_MAIN_HEIGHT_ACTIVE + 'px';
      mapPinMain.style.left = Math.max(MapLimits.MIN_X, Math.min(locationMaxX, result.x)) - mapPinMain.offsetWidth / 2 + 'px';

      // Добавляем смещение к текущим координатам

    };

    // Останавливаем перетаскивание
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getPinMainPosition();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  mapPinMain.addEventListener('mousedown', onMouseDown);

  window.map = {
    mapPinMain: mapPinMain,
    getPinMainPosition: getPinMainPosition
  };
})();
