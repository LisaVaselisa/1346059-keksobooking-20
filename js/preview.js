'use strict';

(function () {
  var FileType = ['jpg', 'png', 'jpeg', 'gif'];
  var avatarChooser = document.querySelector('#avatar');
  var housingChooser = document.querySelector('#images');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var formPhoto = document.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FileType.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  housingChooser.addEventListener('change', function () {
    var file = housingChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FileType.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        formPhoto.innerHTML = '<img src ="" alt= "Фотография жилья" width="70" height="70">';
        formPhoto.querySelector('img').src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  // Убираем фото
  var removePhoto = function () {
    var avatarPreviewScr = avatarPreview.src;
    avatarPreview.src = avatarPreviewScr;
    housingChooser.innerHTML = '';
  };

  window.preview = {
    avatarChooser: avatarChooser,
    housingChooser: housingChooser,
    removePhoto: removePhoto

  };
})();
