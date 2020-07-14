'use strict';
//  отвечает за создание метки на карте

(function () {
  var PinSizes = {WIDTH: 50, HEIGHT: 70};
  var mapElement = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');

  // Отрисовка метки
  var renderNewPin = function (newPin) {
    var newPinElement = pinTemplate.cloneNode(true);
    newPinElement.querySelector('img').src = newPin.author.avatar;
    newPinElement.querySelector('img').alt = newPin.offer.title;
    newPinElement.style.left = newPin.location.x - PinSizes.WIDTH / 2 + 'px';
    newPinElement.style.top = newPin.location.y - PinSizes.HEIGHT + 'px';


    newPinElement.addEventListener('click', function () {
      window.card.closeCard(); // закрыть предыдушую карту
      mapElement.insertBefore(window.card.renderNewCard(newPin), filtersContainer);
      document.addEventListener('eskdown', window.main.onHandlerEscDown);
      document.addEventListener('keydown', window.main.onHandlerKeyDown);
    });
    return newPinElement;
  };

  // Разместить пины на карте
  var postPins = function (newPins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < newPins.length; i++) {
      fragment.appendChild(renderNewPin(newPins[i]));

      if (newPins[i].offer) {
        fragment.appendChild(renderNewPin(newPins[i]));
      }
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    mapElement: mapElement,
    filtersContainer: filtersContainer,
    postPins: postPins,
    renderNewPin: renderNewPin,
  };

})();
