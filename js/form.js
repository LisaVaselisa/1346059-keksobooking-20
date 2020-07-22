'use strict';

(function () {
  var PricesMin = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
  var PinStartingPositions = {X: '570px', Y: '375px'};
  var formSelect = document.querySelector('.ad-form');
  var submitForm = formSelect.querySelector('.ad-form__submit');
  var titleForm = formSelect.querySelector('#title');
  var priceSelect = formSelect.querySelector('#price');
  var roomsSelect = formSelect.querySelector('#room_number');
  var guestsSelect = formSelect.querySelector('#capacity');
  var typeSelect = formSelect.querySelector('#type');
  var addressSelect = formSelect.querySelector('#address');
  var mapFieldForm = formSelect.querySelectorAll('fieldset, select, input');
  var resetForm = formSelect.querySelector('.ad-form__reset');
  var mapFilter = document.querySelector('.map__filters');
  var mapFiltersForm = mapFilter.querySelectorAll('fieldset, select, input');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var newPins = [];

  var disableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', true);
    }
  };

  var enableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  var checkTitle = function () {
    switch (true) {
      case titleForm .validity.valueMissing :
        return titleForm.setCustomValidity('Введите заголовок');
      case titleForm.validity.tooShort :
        return titleForm.setCustomValidity('Введите не менее 30 символов');
      case titleForm .validity.tooLong :
        return titleForm.setCustomValidity('Введите не более 100 символов');
      default:
        return titleForm.setCustomValidity('');
    }
  };

  var checkRoomsAndGuests = function () {
    switch (true) {
      case roomsSelect.value === '100' && guestsSelect.value !== '0':
        return guestsSelect.setCustomValidity('Размещение гостей невозможно');
      case roomsSelect.value !== '100' && guestsSelect.value === '0':
        return guestsSelect.setCustomValidity('Выберете колличество гостей');
      case roomsSelect.value < guestsSelect.value && guestsSelect.value.value !== '0':
        return guestsSelect.setCustomValidity('Количество гостей не должно превышать количество комнат');
      default:
        return guestsSelect.setCustomValidity('');
    }
  };

  var setTypeAndPrice = function () {
    priceSelect.min = PricesMin[typeSelect.value];
    priceSelect.placeholder = PricesMin[typeSelect.value];
  };

  var setTimeIn = function () {
    timeOut.value = timeIn.value;
  };

  var setTimeOut = function () {
    timeIn.value = timeOut.value;
  };

  var savePins = function (data) {
    newPins = data;
  };

  formSelect.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.uploadData(new FormData(formSelect), window.notify.onSuccessUpload, window.notify.onErrorUpload);
    deactivatePage();
  });

  resetForm.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivatePage();
  });

  var filteredPins = function (arr) {
    arr = window.filter.getFilterPins(newPins);
    window.pin.removePins();
    window.card.removeCard();
    window.pin.showPins(arr);
  };

  // Активное состоние страницы
  var activatePage = function () {
    window.pin.mapElement.classList.remove('map--faded');
    formSelect.classList.remove('ad-form--disabled');
    mapFilter.removeAttribute('disabled');
    addressSelect.setAttribute('readonly', 'readonly');
    titleForm.addEventListener('input', checkTitle);
    window.map.removeHandlerEventListener();
    enableElements(mapFiltersForm);
    enableElements(mapFieldForm);
    window.map.getPinMainPosition(true);
    window.backend.loadData(window.notify.onSuccessLoad, window.notify.onErrorLoad);
  };

  // Неактивное состояние страницы
  var deactivatePage = function () {
    window.pin.mapElement.classList.add('map--faded');
    formSelect.classList.add('ad-form--disabled');
    mapFilter.setAttribute('disabled', true);
    formSelect.reset();
    mapFilter.reset();
    setTypeAndPrice();
    window.pin.removePins();
    window.card.removeCard();
    window.preview.removePhotos();
    window.map.pinMain.style.left = PinStartingPositions.X;
    window.map.pinMain.style.top = PinStartingPositions.Y;
    init();
  };

  var init = function () {
    enableElements(deactivatePage);
    disableElements(mapFiltersForm);
    disableElements(mapFieldForm);
    window.map.setHandlerEventListener();
  };
  init();

  roomsSelect.addEventListener('change', checkRoomsAndGuests);
  guestsSelect.addEventListener('change', checkRoomsAndGuests);
  submitForm.addEventListener('click', checkRoomsAndGuests);
  typeSelect.addEventListener('change', setTypeAndPrice);
  timeIn.addEventListener('change', setTimeIn);
  timeOut.addEventListener('change', setTimeOut);
  mapFilter.addEventListener('change', window.debounce(filteredPins));

  window.form = {
    newPins: newPins,
    addressSelect: addressSelect,
    disableElements: disableElements,
    enableElements: enableElements,
    checkTitle: checkTitle,
    activatePage: activatePage,
    deactivatePage: deactivatePage,
    savePins: savePins,
    filteredPins: filteredPins
  };
})();
