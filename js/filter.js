'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var pinsAds = [];

  function filterHausing(element) {
    return housingType.value === element.offer.type || housingType.value === 'any';
  }

  var getFilterPins = function (elements) {
    var newPins = [];
    for (var i = 0; i < elements.length; i++) {
      var pin = elements[i];
      if (filterHausing(pin)) {
        newPins.push(elements[i]);
      }
    }
    return newPins;
  };

  var filterPins = function () {
    // window.pin.postPins(pinsAds);
    window.pin.removePins();
    window.card.closeCard();
    getFilterPins(pinsAds);
  };

  window.filter = {
    getFilterPins: getFilterPins,
    filterPins: filterPins,
  };
})();
