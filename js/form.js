'use strict';
// работает с формой объявления

(function () {
  var newPins = [];
  var PriceMin = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
  var PinStartPosition = {X: '570px', Y: '375px'};
  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var titleForm = adForm.querySelector('#title');
  var priceSelect = adForm.querySelector('#price');
  var roomsSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var typeSelect = adForm.querySelector('#type');
  var mapFieldForm = adForm.querySelectorAll('fieldset, select, input');
  var addressInput = adForm.querySelector('#address');
  var resetForm = adForm.querySelector('.ad-form__reset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersForm = mapFilters.querySelectorAll('fieldset, select, input');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');


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
    if (roomsSelect.value === '100' && capacitySelect.value !== '0') {
      roomsSelect.setCustomValidity('Количество гостей не должно превышать количество комнат');
    } else if (roomsSelect.value !== '100' && capacitySelect.value === '0') {
      roomsSelect.setCustomValidity('Выберите количество гостей');
    } else if (roomsSelect.value < capacitySelect.value && capacitySelect.value !== '0') {
      roomsSelect.setCustomValidity('Количество комнат не должно быть меньше количества гостей');
    } else {
      roomsSelect.setCustomValidity('');
    }
  };

  // Зависимость типа жилья и цены
  var installTypeAndPrice = function () {
    priceSelect.min = PriceMin[typeSelect.value];
    priceSelect.placeholder = PriceMin[typeSelect.value];
  };

  // Зависимость времени заезда и выезда
  var installTimeIn = function () {
    timeOut.value = timeIn.value;
  };

  var installTimeOut = function () {
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

  // Активное состоние страницы
  var activePage = function () {
    window.pin.mapElement.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.removeAttribute('disabled');
    addressInput.setAttribute('readonly', 'readonly');
    titleForm.addEventListener('input', checkTitle);
    window.pin.postPins(newPins);
    window.map.closeHandlerEventListener();
    enableElements(mapFiltersForm);
    enableElements(mapFieldForm);
    window.map.getPinMainPosition(true);
  };

  // Неактивное состояние страницы
  var deactivePage = function () {
    window.pin.mapElement.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.setAttribute('disabled', true);
    adForm.reset();
    mapFilters.reset();
    window.pin.removePins();
    window.card.closeCard();
    window.map.pinMain.style.left = PinStartPosition.X;
    window.map.pinMain.style.top = PinStartPosition.Y;
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

  roomsSelect.addEventListener('change', checkRoomsAndCapacity);
  capacitySelect.addEventListener('change', checkRoomsAndCapacity);
  adFormSubmit.addEventListener('click', checkRoomsAndCapacity);
  typeSelect.addEventListener('change', installTypeAndPrice);
  timeIn.addEventListener('change', installTimeIn);
  timeOut.addEventListener('change', installTimeOut);

  window.form = {
    addressInput: addressInput,
    disableElements: disableElements,
    enableElements: enableElements,
    checkTitle: checkTitle,
    activePage: activePage,
    deactivePage: deactivePage,
    savePins: savePins
  };
})();
