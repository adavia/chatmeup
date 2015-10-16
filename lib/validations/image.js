validateImage = function (image) {
  var errors = {};

	if (image.description.length > 200) {
		errors.description = 'Your description should be 200 characters max.';
	}
  
  return errors;
}