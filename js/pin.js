'use strict';
//  отвечает за создание метки на карте

(function () {
  var PinSizes = {WIDTH: 50, HEIGHT: 70};
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapElement = document.querySelector('.map');
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
      document.addEventListener('keydown', window.main.onHandlerEscDown);
      document.addEventListener('keydown', window.main.onHandlerKeyDown);
    });

    return newPinElement;
  };

  window.pin = {
    mapElement: mapElement,
    renderNewPin: renderNewPin
  };

})();


