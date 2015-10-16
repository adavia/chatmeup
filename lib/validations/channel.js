validateChannel = function (channel) {
  var errors = {};

  if (!channel.name) {
    errors.name = 'You need to fill in with a name!';
  } else {
  	if (channel.name.length > 25) {
			errors.name = 'This name is too long!';
		}
  }

  if (!channel.topic) {
    errors.topic = 'You need to fill in with a topic!';
  } else {
  	if (channel.topic.length > 150) {
			errors.topic = 'This topic is too long!';
		}
  }

  return errors;
}