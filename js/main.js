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
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OBJECT = 8;
var ROOMS = [1, 2, 3, 100];
var GUESTS = [1, 2, 3, 0];
var PRICE = 1000;
var MapLocations = {MIN_X: 0, MIN_Y: 130, MAX_Y: 630};
var PinSizes = {WIDTH: 50, HEIGHT: 70};
var typesRuss = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

var locationMaxX = document.querySelector('.map').offsetWidth;
var mapElement = document.querySelector('.map');
// Шаблон метки
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// Элемент списка меток на карте
var pinsMap = document.querySelector('.map__pins');
// Шаблон карточки
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var filtersContainer = document.querySelector('.map__filters-container');

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
    var joinElement = getRandomElement; // getRandomNumber(0, array.length - 1);
    var buffer = shuffledObject[i];
    shuffledObject[i] = shuffledObject[joinElement];
    shuffledObject[joinElement] = buffer;
  }
  return shuffledObject;
};

// Возвращает массив случайной длины методом слайс и сокращаем
var getRandomLenght = function (array) {
  var randomLenght = shuffleObjects(array);
  return randomLenght.slice(0, getRandomNumber(1, array.Length));
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
        type: getRandomElement(TYPES), // случайный тип объявлений
        checkin: getRandomElement(CHECKINS), // случайная дата заезда
        checkout: getRandomElement(CHECKOUTS), // случайная дата выезда
        features: getRandomLenght(FEATURES, 1, 6),
        photos: getRandomLenght(PHOTOS, 1, 4), // случайное фото
        rooms: getRandomElement(ROOMS), // случайное кол комнат
        guests: getRandomElement(GUESTS), // случайное кол гостей
        price: (PRICE), // случайная цена
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

// Добавить метки на карту
var renderNewPinOnMap = function (newPins) {
  var fragment = document.createDocumentFragment();
  newPins.forEach(function (newPin) {
    fragment.appendChild(renderNewPin(newPin));
  });
  pinsMap.appendChild(fragment);
};


var renderNewCard = function (newCard) {
  var newCardElement = cardTemplate.cloneNode(true);

  newCardElement.querySelector('.popup__title').textContent = newCard.offer.title;
  newCardElement.querySelector('.popup__text--address').textContent = newCard.offer.address;
  newCardElement.querySelector('.popup__text--price').textContent = newCard.offer.price + '₽/ночь';
  newCardElement.querySelector('.popup__type').textContent = typesRuss[newCard.offer.type];
  newCardElement.querySelector('.popup__text--capacity').textContent = newCard.offer.rooms + ' комнат(ы) для ' + newCard.offer.guests + ' гостей';
  newCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + newCard.offer.checkin + ', выезд до ' + newCard.offer.checkout;
  newCardElement.querySelector('.popup__description').textContent = newCard.offer.description;
  newCardElement.querySelector('.popup__avatar').src = newCard.author.avatar;


  var offerFeatures = newCardElement.querySelector('.popup__features');
  var fragment = document.createDocumentFragment();

  offerFeatures.innerHTML = '';
  offerFeatures.appendChild(fragment);

  if (newCard.offer.photos.length > 0) {
    for (var i = 0; i < newCard.offer.features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + newCard.offer.features[i]);
      fragment.appendChild(feature);
    }
  }

  // добавить фото для карточки
  var offerPhotos = newCardElement.querySelector('.popup__photos');

  offerPhotos.innerHTML = '';

  if (newCard.offer.photos.length > 0) {
    for (var l = 0; l < newCard.offer.photos.length; l++) {
      var photo = document.createElement('img');
      photo.src = newCard.offer.photos[l];
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      offerPhotos.appendChild(photo);
    }
  }

  return newCardElement;
};


var getCard = function (newCard) {
  if (newCard) {
    mapElement.insertBefore(renderNewCard(newCard), filtersContainer);
  }
};

// Показываем карту
var init = function () {
  var newPins = generateRandomObject(NUMBER_OBJECT);
  renderNewPinOnMap(newPins);
  mapElement.classList.remove('map--faded');
  getCard(newPins[0]);
};

init();
