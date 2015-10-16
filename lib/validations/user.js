validateUser = function (user) {
  var errors = {};

  if (!user.username) {
    errors.username = 'Please fill in your username';
  } else if (user.username.length > 20) {
		errors.username = 'Your username should be 20 characters max.';
  } else {
  	if (user.username.length < 6) {
			errors.username = 'Your username should be 6 characters or longer.';
		}
  }

  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!user.email) {
    errors.email = 'Please fill in your email';
  } else {
		if (!filter.test(user.email)) {
			errors.email = "Please enter a valid email address.";
		}
	}

  if (!user.password) {
    errors.password = 'Please fill in your password';
  } else {
  	if (user.password.length < 6) {
			errors.password = 'Your password should be 6 characters or longer.';
		}
  }
  
  var birthday = moment(user.profile.birthday, 'DD-MM-YYYY', true);
  if (!birthday.isValid()) {
  	errors.birthday = 'The date is not valid';
  } else {
  	if (birthday.isAfter(moment().format())) {
  	  errors.birthday = 'The date can\'t be greater than today';
  	}
  }

  if (!user.profile.gender) {
    errors.gender = 'Please select your gender';
  } else {
  	if (!_.contains(['m', 'f'], user.profile.gender)) {
  		errors.gender = 'Please select a correct gender';
  	}
  }

  return errors;
}