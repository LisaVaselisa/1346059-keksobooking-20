'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');

  function filterHausing(element) {
    return housingType.value === element.offer.type || housingType.value === 'any';
  }

  var getFilterPins = function (elements) {
    var pinsAds = [];
    for (var i = 0; i < elements.length; i++) {
      var pin = elements[i];
      if (filterHausing(pin)) {
        pinsAds.push(pin);
      }
    }
    return pinsAds;
  };

  window.filter = {
    getFilterPins: getFilterPins,
  };
})();
