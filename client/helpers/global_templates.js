UI.registerHelper('primaryPicture', function (id) {
  var isPrimary = Images.findOne({userId: id, primary: true});
  if (isPrimary) {
  	return isPrimary.url({store:'thumb'});
  } else {
  	return "/images/user.png";
  }
});

UI.registerHelper('userAge', function (date) {
  return moment().diff(date, 'years');
});

UI.registerHelper('formatDate', function (date) {
	return moment(date).fromNow();
});

