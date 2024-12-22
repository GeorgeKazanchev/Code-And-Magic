'use strict';

(function() {
  var IMAGE_FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var fileChooserElement = document.querySelector('.upload input[type="file"]');
  var previewElement = document.querySelector('.setup-user-pic');
  var setupOpenIconElement = document.querySelector('.setup-open-icon');

  var setAvatarPreviews = function(avatarUrl) {
    previewElement.src = avatarUrl;
    setupOpenIconElement.src = avatarUrl;
  };

  fileChooserElement.addEventListener('change', function() {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var isImage = IMAGE_FILE_TYPES.some(function(item) {
      return fileName.endsWith(item);
    });

    if (isImage) {
      var reader = new FileReader();

      reader.addEventListener('load', function() {
        setAvatarPreviews(reader.result);
        localStorage.setItem('avatarUrl', reader.result);
      });

      reader.readAsDataURL(file);
    }
  });

  var avatarUrl = localStorage.getItem('avatarUrl');
  if (avatarUrl) {
    setAvatarPreviews(avatarUrl);
  }
})();
