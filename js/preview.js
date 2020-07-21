'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'png', 'jpeg', 'gif'];
  var avatarChooser = document.querySelector('#avatar');
  var housingChooser = document.querySelector('#images');
  var avatarPhoto = document.querySelector('.ad-form-header__preview img');
  var hausingPhoto = document.querySelector('.ad-form__photo');

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
    var avatarPhotoScr = avatarPhoto.src;
    avatarPhoto.src = avatarPhotoScr;
    avatarPhoto.innerHTML = '';
    hausingPhoto.innerHTML = '';
  };

  window.preview = {
    removePhotos: removePhotos

  };
})();
