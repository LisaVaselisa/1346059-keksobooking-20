'use strict';

(function () {
  var MAX_PINS = 5;
  var housingType = document.querySelector('#housing-type');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuest = document.querySelector('#housing-guests');
  var housingPrice = document.querySelector('#housing-price');
  var housingFeatures = document.querySelector('#housing-features');

  var PriceValues = {MIN: 10000, MAX: 50000};

  var selectFilterType = function (element) {
    return housingType.value === element.offer.type || housingType.value === 'any';
  };

  var selectFilterRooms = function (element) {
    return String(housingRoom.value) === element.offer.rooms || housingRoom.value === 'any';
  };

  var selectFilterGuests = function (element) {
    return String(housingGuest.value) === element.offer.guests || housingGuest.value === 'any';
  };

  var selectFilterPrice = function (element) {
    switch (housingPrice.value) {
      case 'low':
        return element.offer.price < PriceValues.MIN;
      case 'medium':
        return PriceValues.MIN <= element.offer.price && element.offer.price < PriceValues.MAX;
      case 'high':
        return element.offer.price >= PriceValues.MAX;
      default:
        return true;
    }
  };

  var selectFilterFeatures = function (element) {
    var elementFeatures = housingFeatures.querySelectorAll('input:checked');
    return Array.from(elementFeatures).every(function (feature) {
      return element.offer.features.includes(feature.value, 0);
    });
  };

  var getFilterPins = function (elements) {
    var pins = [];
    for (var i = 0; i < elements.length && pins.length < MAX_PINS; i++) {
      var pin = elements[i];
      if (selectFilterType(pin) && selectFilterRooms(pin) && selectFilterGuests(pin) && selectFilterPrice(pin) && selectFilterFeatures(pin)) {
        pins.push(pin);
      }
    }
    return pins;
  };

  window.filter = {
    getFilterPins: getFilterPins
  };
})();
