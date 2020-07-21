'use strict';
// работает с формой объявления

(function () {
  var PricesMin = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
  var PinStartingPositions = {X: '570px', Y: '375px'};
  var adForm = document.querySelector('.ad-form');
  var submitForm = adForm.querySelector('.ad-form__submit');
  var titleForm = adForm.querySelector('#title');
  var priceForm = adForm.querySelector('#price');
  var roomsForm = adForm.querySelector('#room_number');
  var capacityForm = adForm.querySelector('#capacity');
  var typeForm = adForm.querySelector('#type');
  var mapFieldForm = adForm.querySelectorAll('fieldset, select, input');
  var addressForm = adForm.querySelector('#address');
  var resetForm = adForm.querySelector('.ad-form__reset');
  var mapFilter = document.querySelector('.map__filters');
  var mapFiltersForm = mapFilter.querySelectorAll('fieldset, select, input');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var newPins = [];

  // Неактивные элементы
  var disableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', true);
    }
  };

  // Активные элементы
  var enableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  // Сообщения, когда вводим заголовок
  var checkTitle = function () {
    if (titleForm .validity.tooShort) {
      titleForm .setCustomValidity('Введите не более 30 символов');
    } else if (titleForm .validity.tooLong) {
      titleForm .setCustomValidity('Введите не более 100 символов');
    } else if (titleForm .validity.valueMissing) {
      titleForm .setCustomValidity('Введите заголовок');
    } else {
      titleForm .setCustomValidity('');
    }
  };

  // Сообщения, когда вводим количество гостей и комнат
  var checkRoomsAndCapacity = function () {
    if (roomsForm.value === '100' && capacityForm.value !== '0') {
      roomsForm.setCustomValidity('Количество гостей не должно превышать количество комнат');
    } else if (roomsForm.value !== '100' && capacityForm.value === '0') {
      roomsForm.setCustomValidity('Выберите количество гостей');
    } else if (roomsForm.value < capacityForm.value && capacityForm.value !== '0') {
      roomsForm.setCustomValidity('Количество комнат не должно быть меньше количества гостей');
    } else {
      roomsForm.setCustomValidity('');
    }
  };

  // Зависимость типа жилья и цены
  var setTypeAndPrice = function () {
    priceForm.min = PricesMin[typeForm.value];
    priceForm.placeholder = PricesMin[typeForm.value];
  };

  // Зависимость времени заезда и выезда
  var setTimeIn = function () {
    timeOut.value = timeIn.value;
  };

  var setTimeOut = function () {
    timeIn.value = timeOut.value;
  };

  var savePins = function (data) {
    newPins = data;
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.uploadData(new FormData(adForm), window.notify.onSuccessUpload, window.notify.onErrorUpload);
    deactivePage();
  });

  resetForm.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivePage();
  });

  var filteredPins = function (arr) {
    arr = window.filter.getFilterPins(newPins);
    window.pin.removePins();
    window.card.removeCard();
    window.pin.showPins(arr);
  };

  // Активное состоние страницы
  var activePage = function () {
    window.pin.mapElement.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilter.removeAttribute('disabled');
    addressForm.setAttribute('readonly', 'readonly');
    titleForm.addEventListener('input', checkTitle);
    filteredPins();
    window.map.removeHandlerEventListener();
    enableElements(mapFiltersForm);
    enableElements(mapFieldForm);
    window.map.getPinMainPosition(true);
  };

  // Неактивное состояние страницы
  var deactivePage = function () {
    window.pin.mapElement.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilter.setAttribute('disabled', true);
    adForm.reset();
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
    enableElements(deactivePage);
    disableElements(mapFiltersForm);
    disableElements(mapFieldForm);
    window.map.setHandlerEventListener();
    window.backend.loadData(window.notify.onSuccessLoad, window.notify.onErrorLoad);
  };
  init();

  roomsForm.addEventListener('change', checkRoomsAndCapacity);
  capacityForm.addEventListener('change', checkRoomsAndCapacity);
  submitForm.addEventListener('click', checkRoomsAndCapacity);
  typeForm.addEventListener('change', setTypeAndPrice);
  timeIn.addEventListener('change', setTimeIn);
  timeOut.addEventListener('change', setTimeOut);
  mapFilter.addEventListener('change', window.debounce(filteredPins));

  window.form = {
    newPins: newPins,
    addressForm: addressForm,
    disableElements: disableElements,
    enableElements: enableElements,
    checkTitle: checkTitle,
    activePage: activePage,
    deactivePage: deactivePage,
    savePins: savePins,
    filteredPins: filteredPins
  };
})();
