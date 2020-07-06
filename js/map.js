'use strict';
// управляет карточками объявлений и метками:
// добавляет на страницу нужную карточку
// отрисовывает метки
// осуществляет взаимодействие карточки и метки на карте

(function () {
  var PIN_MAIN_HEIGHT_ACTIVE = 22;
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');

  // Разместить метку на карте
  var postNewPin = function (newPins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < newPins.length; i++) {
      fragment.appendChild(window.pin.renderNewPin(newPins[i]));

      if (newPins[i].offer) {
        fragment.appendChild(window.pin.renderNewPin(newPins[i]));
      }
    }
    mapPins.appendChild(fragment);
  };

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

  // // 5-3 ПЕРЕМЕЩЕНИЕ
  // // главный пин и его перемещение
  // var positionLeft = window.data.mapLimitsMinX - mapPinMain.offsetWidth / 2;
  // var positionRight = window.data.mapLimitsMaxX - mapPinMain.offsetWidth / 2;
  // var positionTop = window.data.mapLimitsMinY - mapPinMain.offsetHeight - PIN_MAIN_HEIGHT_ACTIVE;
  // var positionBottom = window.data.mapLimitsMaxY - mapPinMain.offsetHeight - PIN_MAIN_HEIGHT_ACTIVE;

  // var onMouseDown = function (evt) {
  //   evt.preventDefault();

  //   var startCoords = {
  //     x: evt.clientX,
  //     y: evt.clientY
  //   };
  //   var onMouseMove = function (moveEvt) {
  //     moveEvt.preventDefault();
  //     getPinMainPosition();

  //     startCoords = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY
  //     };

  //     // Разница между стартовыми координатами и текущим пложением курсора - смещение
  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX,
  //       y: startCoords.y - moveEvt.clientY
  //     };

  //     var result = {
  //       x: mapPinMain.offsetLeft - shift.x,
  //       y: mapPinMain.offsetTop - shift.y
  //     };

  //     if (result.x <= positionLeft) {
  //       result.x = positionLeft;
  //     } else if (result.x >= positionRight) {
  //       result.x = positionRight;
  //     }

  //     if (result.y <= positionTop) {
  //       result.y = positionTop;
  //     } else if (result.y >= positionBottom) {
  //       result.y = positionBottom;
  //     }

  //     // Добавляем смещение к текущим координатам
  //     mapPinMain.style.top = result.y + 'px';
  //     mapPinMain.style.left = result.x + 'px';
  //   };

  //   // Останавливаем перетаскивание
  //   var onMouseUp = function (upEvt) {
  //     upEvt.preventDefault();
  //     getPinMainPosition();

  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // };

  // mapPinMain.addEventListener('mousedown', onMouseDown);

  // Закрываем обработчик нажатия на главный пин при активации карты
  var closehandlerEventListener = function () {
    mapPinMain.removeEventListener('keydown', window.main.onHandlerKeyDown);
    mapPinMain.removeEventListener('mousedown', window.main.onHandlerMouseDown);
  };

  window.map = {
    postNewPin: postNewPin,
    getPinMainPosition: getPinMainPosition,
    closehandlerEventListener: closehandlerEventListener,
  };
})();


