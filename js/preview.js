'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'png', 'jpeg', 'gif'];
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPhoto = document.querySelector('.ad-form-header__img');
  var housingChooser = document.querySelector('#images');
  var hausingPhoto = document.querySelector('.ad-form__photo');
  var hausingPhotoContainer = document.querySelector('.ad-form__photo-container');
  var avatarPhotoScr = avatarPhoto.src;


  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPhoto.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  housingChooser.addEventListener('change', function () {
    var file = housingChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        hausingPhoto.innerHTML = '<img src ="" alt= "Фотография жилья" width="70" height="70">';
        hausingPhoto.querySelector('img').src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // Убираем фото
  var removePhotos = function () {
    avatarPhoto.src = avatarPhotoScr;
    avatarPhoto.innerHTML = '';
    hausingPhoto.innerHTML = '';
    hausingPhotoContainer.querySelectorAll('.ad-form__photo').forEach(function (photoElement) {
      photoElement.remove();
    });
    hausingPhotoContainer.appendChild(hausingPhoto);
  };

  window.preview = {
    removePhotos: removePhotos
  };
})();
