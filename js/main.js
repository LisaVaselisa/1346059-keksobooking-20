'use strict';

var TITLES = [
  'Уютное гнездышко для молодоженов',
  'Маленькая квартирка рядом с парком',
  'Небольшая лавочка в парке',
  'Императорский дворец в центре Токио',
  'Милейший чердачок',
  'Наркоманский притон',
  'Чёткая хата',
  'Стандартная квартира в центре',
  'Тихая квартирка недалеко от метро',
  'Милое гнездышко для фанатов Анимэ',
];
var DESCRIPTIONS = [
  'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
  'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
  'Маленькая квартирка на чердаке. Для самых не требовательных.',
  'У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.',
  'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
  'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
  'Азиатов просьба не беспокоить.'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OBJECT = 8;
var ROOMS = [1, 2, 3, 100];
var GUESTS = [1, 2, 3, 0];
var Price = {MIN: 0, MAX: 10000};
var MapLocations = {MIN_X: 0, MIN_Y: 130, MAX_Y: 630};
var PinSizes = {WIDTH: 50, HEIGHT: 70};
var priceMin = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
var PhotoSizes = {WIDTH: 45, HEIGHT: 40};
var PHOTO_ALT = ['Фотография жилья'];
var types = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
var locationMaxX = document.querySelector('.map').offsetWidth;
var mapElement = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var filtersContainer = document.querySelector('.map__filters-container');
var mapPins = mapElement.querySelector('.map__pins');
var mapPinMain = mapElement.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFiltersForm = document.querySelector('.map__filters');
var mapFieldsForm = adForm.querySelectorAll('fieldset, select, input');
var addressInput = adForm.querySelector('#address');
var titleInput = adForm.querySelector('#title');
var roomsSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');
var typeSelect = adForm.querySelector('#type');
var priceInput = adForm.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

// Получаем случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Получаем случайный элемент массива
var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

// Перемешивание массива
var shuffleObjects = function (array) {
  var shuffledObject = array.slice();
  for (var i = shuffledObject.length - 1; i > 0; i--) {
    var joinElement = getRandomNumber(0, i);
    var buffer = shuffledObject[i];
    shuffledObject[i] = shuffledObject[joinElement];
    shuffledObject[joinElement] = buffer;
  }
  return shuffledObject;
};

// Возвращает массив случайной длины методом слайс и сокращаем
var getRandomLenght = function (array) {
  var randomLenght = shuffleObjects(array);
  return randomLenght.slice(0, getRandomNumber(1, array.length));
};

// Создание массива из объектов
var generateRandomObject = function (limit) {
  var result = [];

  for (var i = 1; i <= limit; i++) {
    var locationX = getRandomNumber(MapLocations.MIN_X, locationMaxX);
    var locationY = getRandomNumber(MapLocations.MIN_Y, MapLocations.MAX_Y);

    result.push({
      author: {
        avatar: 'img/avatars/user0' + i + '.png',
      },
      offer: {
        title: getRandomElement(TITLES),
        description: getRandomElement(DESCRIPTIONS),
        address: locationX + ', ' + locationY,
        type: getRandomElement(types), // случайный тип объявлений
        checkin: getRandomElement(CHECKIN), // случайная дата заезда
        checkout: getRandomElement(CHECKOUT), // случайная дата выезда
        features: getRandomLenght(FEATURES),
        photos: getRandomLenght(PHOTOS), // случайное фото
        rooms: getRandomElement(ROOMS), // случайное кол комнат
        guests: getRandomElement(GUESTS), // случайное кол гостей
        price: getRandomNumber(Price.MIN, Price.MAX), // случайная цена
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return result;
};

// Отрисовка метки
var renderNewPin = function (newPin) {
  var newPinElement = pinTemplate.cloneNode(true);
  newPinElement.style.left = newPin.location.x - (PinSizes.WIDTH * 0.5) + 'px';
  newPinElement.style.top = newPin.location.y - PinSizes.HEIGHT + 'px';

  var avatarPin = newPinElement.querySelector('img');
  avatarPin.src = newPin.author.avatar;
  avatarPin.alt = newPin.offer.title;

  return newPinElement;
};

// Разместить метку на карте
var postNewPin = function (newPins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < newPins.length; i++) {
    fragment.appendChild(renderNewPin(newPins[i]));

    if (newPins[i].offer) {
      fragment.appendChild(renderNewPin(newPins[i]));
    }
  }
  mapPins.appendChild(fragment);
};

var hideElement = function (element) {
  element.classList.add('hidden');
};

// Генерировать предложение для карточки
var renderFeatures = function (container, features) {
  container.innerHTML = '';
  if (features.length) {
    for (var i = 0; i < features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + features[i]);
      container.appendChild(feature);
    }
  } else {
    hideElement(container);
  }
};

// Генерировать фото для карточки
var renderPhotos = function (container, photos) {
  container.innerHTML = '';

  if (photos.length) {
    for (var i = 0; i < photos.length; i++) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = photos[i];
      photo.sizes = PhotoSizes.WIDTH;
      photo.height = PhotoSizes.HEIGHT;
      photo.alt = PHOTO_ALT;
      container.appendChild(photo);
    }
  } else {
    hideElement(container);
  }
};

// Отрисовка карточки предложений
var renderNewCard = function (newCard) {
  var newCardElement = cardTemplate.cloneNode(true);

  var offerFeatures = newCardElement.querySelector('.popup__features');
  var offerPhotos = newCardElement.querySelector('.popup__photos');

  newCardElement.querySelector('.popup__title').textContent = newCard.offer.title || 'no value';
  newCardElement.querySelector('.popup__text--address').textContent = newCard.offer.address || 'no value';
  newCardElement.querySelector('.popup__text--price').textContent = newCard.offer.price + '₽/ночь' || 'no value';
  newCardElement.querySelector('.popup__type').textContent = types[newCard.offer.type] || 'no value';
  newCardElement.querySelector('.popup__text--capacity').textContent = newCard.offer.rooms + ' комнат(ы) для ' + newCard.offer.guests + ' гостей' || 'no value';
  newCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + newCard.offer.checkin + ', выезд до ' + newCard.offer.checkout || 'no value';
  newCardElement.querySelector('.popup__avatar').src = newCard.author.avatar || 'no value';
  renderFeatures(offerFeatures, newCard.offer.features);
  newCardElement.querySelector('.popup__description').textContent = newCard.offer.description || 'no value';
  renderPhotos(offerPhotos, newCard.offer.photos);

  return newCardElement;
};

// Домашняя раота 4-2
// var filtersContainer = document.querySelector('.map__filters-container');
// var mapPins = mapElement.querySelector('.map__pins');
// var mapPinMain = mapElement.querySelector('.map__pin--main');
// var adForm = document.querySelector('.ad-form');
// var mapFiltersForm = document.querySelector('.map__filters');
// var mapFieldsForm = adForm.querySelectorAll('fieldset, select, input');
// var addressInput = adForm.querySelector('#address');
// var titleInput = adForm.querySelector('#title');
// var roomsSelect = adForm.querySelector('#room_number');
// var capacitySelect = adForm.querySelector('#capacity');
// var typeSelect = adForm.querySelector('#type');
// var priceInput = adForm.querySelector('#price');
// var timeIn = document.querySelector('#timein');
// var timeOut = document.querySelector('#timeout');

// Сообщения, когда вводим заголовок
var checkTitle = function () {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Введите не более 30 символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Введите не более 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Введите заголовок');
  } else {
    titleInput.setCustomValidity('');
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
  priceInput.min = priceMin[typeSelect.value];
  priceInput.placeholder = priceMin[typeSelect.value];
};

// Зависимость времени заезда и выезда
var installTimeIn = function () {
  timeOut.value = timeIn.value;
};

var installTimeOut = function () {
  timeIn.value = timeOut.value;
};


// Неактивные элементы
var disableElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'disabled');
  }
};

// Активные элементы
var enableElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
};

// Закрываем главный пин
var closePinMain = function () {
  mapPinMain.removeEventListener('keydown', pinMainKeyDown);
  mapPinMain.removeEventListener('mousedown', pinMainMouseDown);
};

// обработчики событий
var pinMainMouseDown = function (evt) {
  if (evt.which === 1) {
    activePage();
  }
};

var pinMainKeyDown = function (evt) {
  if (evt.key === 'Enter') {
    activePage();
  }
};

//  Определяем позицию главного пина
var getPinPosition = function () {
  var positionX = Math.round(mapPinMain.offsetTop - PinSizes.WIDTH / 2);
  var positionY = Math.round(mapPinMain.offsetLeft - PinSizes.HEIGHT);
  return positionX + ', ' + positionY;
};

// Спрятать карту
var deactivePage = function () {
  mapElement.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  mapFiltersForm.setAttribute('disabled', 'disabled');
  closePinMain();
};

// Активное состоние страницы
var activePage = function () {
  mapElement.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFiltersForm.removeAttribute('disabled');
  enableElements(mapFieldsForm);
  addressInput.value = getPinPosition();
  addressInput.setAttribute('readonly', 'readonly');
  titleInput.addEventListener('input', checkTitle);
};

// Неактивное состояние страницы
var init = function () {
  var newPins = generateRandomObject(NUMBER_OBJECT);
  postNewPin(newPins);
  mapElement.insertBefore(renderNewCard(newPins[0]), filtersContainer);
  enableElements(deactivePage);
  disableElements(mapFieldsForm);
};

roomsSelect.addEventListener('change', checkRoomsAndCapacity);
capacitySelect.addEventListener('change', checkRoomsAndCapacity);
typeSelect.addEventListener('change', installTypeAndPrice);
timeIn.addEventListener('change', installTimeIn);
timeOut.addEventListener('change', installTimeOut);
mapPinMain.addEventListener('mousedown', pinMainMouseDown);
mapPinMain.addEventListener('keydown', pinMainKeyDown);

init();
