'use strict';

(function () {
  var PinSizes = {WIDTH: 50, HEIGHT: 70};
  var mapElement = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');

  // Отрисовка метки
  var renderPin = function (newPin) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    pinImg.src = newPin.author.avatar;
    pinImg.alt = newPin.offer.title;
    pinElement.style.left = newPin.location.x - PinSizes.WIDTH / 2 + 'px';
    pinElement.style.top = newPin.location.y - PinSizes.HEIGHT + 'px';


    pinElement.addEventListener('click', function () {
      window.card.removeCard();
      pinElement.classList.add('map__pin--active');
      mapElement.insertBefore(window.card.renderCard(newPin), filtersContainer);
      document.addEventListener('keydown', window.main.escDownHandler);
      document.addEventListener('keydown', window.main.keyDownHandler);
    });
    return pinElement;
  };

  // Разместить пины на карте
  var showPins = function (newPins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < newPins.length; i++) {
      fragment.appendChild(renderPin(newPins[i]));

      if (newPins[i].offer) {
        fragment.appendChild(renderPin(newPins[i]));
      }
    }
    mapPins.appendChild(fragment);
  };

  // Убираем пины с карты
  var removePins = function () {
    var displayPins = mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    displayPins.forEach(function (element) {
      element.remove();
    });
  };

  window.pin = {
    mapElement: mapElement,
    filtersContainer: filtersContainer,
    showPins: showPins,
    removePins: removePins,
  };
})();
