'use strict';
// отвечает за создание карточки объявлений

(function () {
  var typesRooms = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
  var PhotoSizes = {WIDTH: 45, HEIGHT: 40};
  var PHOTO_ALT = ['Фотография жилья'];
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  // Генерировать предложение для карточки
  var renderFeatures = function (container, features) {
    container.innerHTML = '';
    for (var i = 0; i < features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + features[i]);
      container.appendChild(feature);
    }
  };

  // Генерировать фото для карточки
  var renderPhotos = function (container, photos) {
    container.innerHTML = '';
    for (var i = 0; i < photos.length; i++) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = photos[i];
      photo.sizes = PhotoSizes.WIDTH;
      photo.height = PhotoSizes.HEIGHT;
      photo.alt = PHOTO_ALT;
      container.appendChild(photo);
    }
  };

  // Отрисовка карточки обьявлений
  var renderNewCard = function (newCard) {
    var newCardElement = cardTemplate.cloneNode(true);
    var offerFeatures = newCardElement.querySelector('.popup__features');
    var offerPhotos = newCardElement.querySelector('.popup__photos');

    newCardElement.querySelector('.popup__title').textContent = newCard.offer.title;
    newCardElement.querySelector('.popup__text--address').textContent = newCard.offer.address;
    newCardElement.querySelector('.popup__text--price').textContent = newCard.offer.price + '₽/ночь';
    newCardElement.querySelector('.popup__type').textContent = typesRooms[newCard.offer.type];
    newCardElement.querySelector('.popup__text--capacity').textContent = newCard.offer.rooms + ' комнат(ы) для ' + newCard.offer.guests + ' гостей';
    newCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + newCard.offer.checkin + ', выезд до ' + newCard.offer.checkout;
    newCardElement.querySelector('.popup__avatar').src = newCard.author.avatar;
    renderFeatures(offerFeatures, newCard.offer.features);
    newCardElement.querySelector('.popup__description').textContent = newCard.offer.description;
    renderPhotos(offerPhotos, newCard.offer.photos);

    newCardElement.addEventListener('click', function () {
      closeCard();
      document.addEventListener('keydown', window.main.onHandlerKeyDown);
    });

    return newCardElement;
  };

  // Удалить карточку
  var closeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.querySelector('.popup__close');
      mapCard.remove(); // Удаляем все старые объявления
      document.removeEventListener('keydown', window.main.onHandlerKeyDown);
    }
  };

  window.card = {
    renderNewCard: renderNewCard,
    closeCard: closeCard
  };

})();

