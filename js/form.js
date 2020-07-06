'use strict';
// работает с формой объявления

(function () {

  var NUMBER_OBJECT = 8;
  var priceMin = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var titleForm = adForm.querySelector('#title');
  var priceSelect = adForm.querySelector('#price');
  var roomsSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var typeSelect = adForm.querySelector('#type');
  var mapFieldForm = adForm.querySelectorAll('fieldset, select, input');
  var addressInput = adForm.querySelector('#address');
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
    priceSelect.min = priceMin[typeSelect.value];
    priceSelect.placeholder = priceMin[typeSelect.value];
  };

  // Зависимость времени заезда и выезда
  var installTimeIn = function () {
    timeOut.value = timeIn.value;
  };

  var installTimeOut = function () {
    timeIn.value = timeOut.value;
  };

  // Активное состоние страницы
  var activePage = function () {
    window.pin.mapElement.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.removeAttribute('disabled');
    enableElements(mapFiltersForm);
    enableElements(mapFieldForm);
    window.map.getPinMainPosition(true);
    addressInput.setAttribute('readonly', 'readonly');

    titleForm.addEventListener('input', checkTitle);
    var newPins = window.data.generateRandomObject(NUMBER_OBJECT);
    window.map.postNewPin(newPins);
    window.map.closehandlerEventListener();
    // window.pin.mapElement.insertBefore(renderNewCard(newPins[0]), filtersContainer);
  };

  // Неактивное состояние страницы
  var deactivePage = function () {
    window.pin.mapElement.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.setAttribute('disabled', true);
  };

  // Неактивное состояние страницы
  var init = function () {
    enableElements(deactivePage);
    disableElements(mapFieldForm);
  };

  roomsSelect.addEventListener('change', checkRoomsAndCapacity);
  capacitySelect.addEventListener('change', checkRoomsAndCapacity);
  adFormSubmit.addEventListener('click', checkRoomsAndCapacity);
  typeSelect.addEventListener('change', installTypeAndPrice);
  timeIn.addEventListener('change', installTimeIn);
  timeOut.addEventListener('change', installTimeOut);
  init();

  window.form = {
    addressInput: addressInput,
    disableElements: disableElements,
    enableElements: enableElements,
    checkTitle: checkTitle,
    activePage: activePage,
    deactivePage: deactivePage
  };
})();


