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
var ROOMS = {min: 1, max: 4};
var GUESTS = {min: 1, max: 6};
var PRICE = 1000;
var LOCATION_MIN_X = 0;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

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
  var locationMaxX = document.querySelector('.map').offsetWidth;

  for (var i = 1; i <= limit; i++) {
    var locationX = getRandomNumber(LOCATION_MIN_X, locationMaxX);
    var locationY = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);
    var location = locationX + ', ' + locationY;
    var avatarLocation = 'img/avatars/user0' + (i) + '.png';

    result.push({
      author: {
        avatar: avatarLocation
      },
      offer: {
        title: getRandomElement(TITLES),
        description: getRandomElement(DESCRIPTIONS),
        address: location,
        type: getRandomElement(TYPES),
        checkin: getRandomElement(CHECKINS),
        checkout: getRandomElement(CHECKOUTS),
        features: getRandomLenght(FEATURES, 0),
        photo: getRandomLenght(PHOTOS),
        rooms: getRandomNumber(ROOMS.min, ROOMS.max),
        guests: getRandomNumber(GUESTS.min, GUESTS.max),
        price: PRICE,
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return result;
};

// Показываем карту
var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

// Шаблон метки
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Элемент списка меток на карте
var pinsMap = document.querySelector('.map__pins');

// Отрисовка метки
var renderNewPin = function (newPin) {
  var newPinElement = pinTemplate.cloneNode(true);

  newPinElement.style.left = newPin.location.x - (PIN_WIDTH * 0.5) + 'px';
  newPinElement.style.top = newPin.location.y - PIN_HEIGHT + 'px';

  newPinElement.querySelector('img').src = newPin.author.avatar;
  newPinElement.querySelector('img').alt = newPin.offer.title;

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

var newPins = generateRandomObject(NUMBER_OBJECT);
renderNewPinOnMap(newPins);
