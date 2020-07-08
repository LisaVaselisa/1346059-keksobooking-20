'use strict';
// создаёт данные

(function () {

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
  var AVATAR_PHOTO = 'img/avatars/user0';
  var AVATAR_TIP = '.png';
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var ROOMS = [1, 2, 3, 100];
  var GUESTS = [1, 2, 3, 0];
  var Price = {MIN: 1000, MAX: 10000};
  var MapLimits = {MIN_X: 0, MIN_Y: 130, MAX_Y: 630};
  var locationMaxX = document.querySelector('.map__overlay').offsetWidth;

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
      var locationX = getRandomNumber(MapLimits.MIN_X, locationMaxX);
      var locationY = getRandomNumber(MapLimits.MIN_Y, MapLimits.MAX_Y);

      result.push({
        author: {
          avatar: AVATAR_PHOTO + i + AVATAR_TIP,
        },
        offer: {
          title: getRandomElement(TITLES),
          description: getRandomElement(DESCRIPTIONS),
          address: locationX + ', ' + locationY,
          type: getRandomElement(TYPES), // случайный тип жилья
          checkin: getRandomElement(CHECKIN), // случайная дата заезда
          checkout: getRandomElement(CHECKOUT), // случайная дата выезда
          features: getRandomLenght(FEATURES), // случайные допольнитеьные опции
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
  window.data = {
    generateRandomObject: generateRandomObject,
    mapLimitsMinX: MapLimits.MIN_X,
    mapLimitsMaxX: locationMaxX,
    mapLimitsMinY: MapLimits.MIN_Y,
    mapLimitsMaxY: MapLimits.MAX_Y
  };
})();


