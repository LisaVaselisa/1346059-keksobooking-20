'use strict';
// управляет карточками объявлений и метками:
// добавляет на страницу нужную карточку
// отрисовывает метки
// осуществляет взаимодействие карточки и метки на карте

(function () {
  var PIN_MAIN_HEIGHT_ACTIVE = 22;
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

  mapPinMain.addEventListener('mousedown', window.main.onHandlerMouseDown);
  mapPinMain.addEventListener('keydown', window.main.onHandlerKeyDown);

  // 5-3 ПЕРЕМЕЩЕНИЕ
  // главный пин и его перемещение
  var positionLeft = window.data.mapLimitsMinX - mapPinMain.offsetWidth / 2;
  var positionRight = window.data.mapLimitsMaxX - mapPinMain.offsetWidth / 2;
  var positionTop = window.data.mapLimitsMinY - mapPinMain.offsetHeight - PIN_MAIN_HEIGHT_ACTIVE;
  var positionBottom = window.data.mapLimitsMaxY - mapPinMain.offsetHeight - PIN_MAIN_HEIGHT_ACTIVE;

  var onMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getPinMainPosition();

      // Разница между стартовыми координатами и текущим пложением курсора - смещение
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var result = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      if (result.x <= positionLeft) {
        result.x = positionLeft;
      } else if (result.x >= positionRight) {
        result.x = positionRight;
      }

      if (result.y <= positionTop) {
        result.y = positionTop;
      } else if (result.y >= positionBottom) {
        result.y = positionBottom;
      }

      // Добавляем смещение к текущим координатам
      mapPinMain.style.top = result.y + 'px';
      mapPinMain.style.left = result.x + 'px';
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
