'use strict';

(function() {
  var IMAGE_FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var fileChooserElement = document.querySelector('.upload input[type="file"]');
  var previewElement = document.querySelector('.setup-user-pic');
  var setupOpenIconElement = document.querySelector('.setup-open-icon');

  fileChooserElement.addEventListener('change', function() {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var isImage = IMAGE_FILE_TYPES.some(function(item) {
      return fileName.endsWith(item);
    });

    if (isImage) {
      var reader = new FileReader();

      reader.addEventListener('load', function() {
        previewElement.src = reader.result;
        setupOpenIconElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
