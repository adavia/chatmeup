validateMessage = function (message) {
  var errors = {};

  if (!message.content) {
    errors.content = 'You need to say something!';
  } else {
  	if (message.content.length > 300) {
			errors.content = 'Thats too long!';
		}
  }

  return errors;
}