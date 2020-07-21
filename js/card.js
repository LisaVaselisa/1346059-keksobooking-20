'use strict';
// отвечает за создание карточки объявлений

(function () {
  var PHOTO_ALT = 'Фотография жилья';
  var PhotoSize = {WIDTH: 45, HEIGHT: 40};
  var TypeRooms = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  // Генерировать предложение для карточки
  var renderFeatures = function (container, features) {
    container.innerHTML = '';

    if (features.length) {
      features.forEach(function (feature) {
        var featureElement = document.createElement('li');
        featureElement.classList.add('popup__feature', 'popup__feature--' + feature);
        container.appendChild(featureElement);
      });
    } else {
      hideElement(container);
    }
  };

  // Генерировать фото для карточки
  var renderPhotos = function (container, photos) {
    container.innerHTML = '';

    if (photos.length) {
      photos.forEach(function (photo) {
        var photoElement = document.createElement('img');
        photoElement.classList.add('popup__photo');
        photoElement.src = photo;
        photoElement.sizes = PhotoSize.WIDTH;
        photoElement.height = PhotoSize.HEIGHT;
        photoElement.alt = PHOTO_ALT;
        container.appendChild(photoElement);
      });
    } else {
      hideElement(container);
    }
  };

  // Отрисовка карточки обьявлений
  var renderCard = function (newCard) {
    var cardElement = cardTemplate.cloneNode(true);
    var offerFeatures = cardElement.querySelector('.popup__features');
    var offerPhotos = cardElement.querySelector('.popup__photos');

    cardElement.querySelector('.popup__title').textContent = newCard.offer.title;

    cardElement.querySelector('.popup__text--address').textContent = newCard.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = newCard.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TypeRooms[newCard.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = newCard.offer.rooms + ' комнат(ы) для ' + newCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + newCard.offer.checkin + ', выезд до ' + newCard.offer.checkout;
    cardElement.querySelector('.popup__avatar').src = newCard.author.avatar;
    renderFeatures(offerFeatures, newCard.offer.features);
    cardElement.querySelector('.popup__description').textContent = newCard.offer.description;
    renderPhotos(offerPhotos, newCard.offer.photos);

    cardElement.addEventListener('click', function () {
      document.addEventListener('keydown', window.main.KeyDownHandler);
      removeCard();
    });
    return cardElement;
  };

  // Удалить карточку
  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.querySelector('.popup__close');
      mapCard.remove();
      document.removeEventListener('keydown', window.main.KeyDownHandler);
    }
  };

  window.card = {
    renderCard: renderCard,
    removeCard: removeCard
  };
})();


