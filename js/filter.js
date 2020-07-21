'use strict';
(function () {
  var MAX_PINS = 5;
  var housingType = document.querySelector('#housing-type');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuest = document.querySelector('#housing-guests');
  var housingPrice = document.querySelector('#housing-price');
  var housingFeatures = document.querySelector('#housing-features');

  var priceValues = {
    low: {min: 0, max: 10000},
    middle: {min: 10000, max: 50000},
    high: {min: 50000, max: 1000000}
  };

  var selectFilterType = function (element) {
    return housingType.value === element.offer.type || housingType.value === 'any';
  };

  var selectFilterRooms = function (element) {
    return housingRoom.value === String(element.offer.rooms) || housingRoom.value === 'any';
  };

  var selectFilterGuests = function (element) {
    return housingGuest.value === String(element.offer.guests) || housingGuest.value === 'any';
  };

  var selectFilterPrice = function (element) {
    if (housingPrice.value !== 'any') {
      return element.offer.price >= priceValues[housingPrice.value].min && element.offer.price <= priceValues[housingPrice.value].max;
    }
    return 'any';
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
