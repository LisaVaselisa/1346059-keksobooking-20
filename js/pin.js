'use strict';
//  отвечает за создание метки на карте

(function () {
  var PinSizes = {WIDTH: 50, HEIGHT: 70};
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapElement = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');

  // Отрисовка метки
  var renderNewPin = function (newPin) {
    var newPinElement = pinTemplate.cloneNode(true);
    newPinElement.style.left = newPin.location.x - PinSizes.WIDTH / 2 + 'px';
    newPinElement.style.top = newPin.location.y - PinSizes.HEIGHT + 'px';

    var avatarPin = newPinElement.querySelector('img');
    avatarPin.src = newPin.author.avatar;
    avatarPin.alt = newPin.offer.title;

    newPinElement.addEventListener('click', function () {
      window.card.closeCard(); // закрыть предыдушую карту
      mapElement.insertBefore(window.card.renderNewCard(newPin), filtersContainer);
      document.addEventListener('eskdown', window.main.onHandlerEscDown);
      document.addEventListener('keydown', window.main.onHandlerKeyDown);
    });

    return newPinElement;
  };

  // Разместить метку на карте
  var postNewPin = function (newPins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < newPins.length; i++) {
      fragment.appendChild(renderNewPin(newPins[i]));

      if (newPins[i].offer) {
        fragment.appendChild(renderNewPin(newPins[i]));
      }
    }
    mapPins.appendChild(fragment);
  };
  // Закрываем обработчик нажатия на главный пин при активации карты
  var closehandlerEventListener = function () {
    window.map.mapPinMain.removeEventListener('keydown', window.main.onHandlerKeyDown);
    window.map.mapPinMain.removeEventListener('mousedown', window.main.onHandlerMouseDown);
  };

  window.pin = {
    mapElement: mapElement,
    filtersContainer: filtersContainer,
    postNewPin: postNewPin,
    renderNewPin: renderNewPin,
    closehandlerEventListener: closehandlerEventListener
  };

})();
