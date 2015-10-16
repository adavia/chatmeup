Template.signup.onCreated(function() {
  Session.set('userSubmitErrors', {});
});

Template.signup.onRendered(function() {
  $('#birthday').combodate({
  	customClass: 'form-control',
    minYear: 1940,
    maxYear: moment().format('YYYY')  
  });    
});

Template.signup.helpers({
	countries: function() {
    return Countries.find();
  },
  errorMessage: function(field) {
    return Session.get('userSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('userSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.signup.events({
	'submit .signup': function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    event.target.submit.value = 'Signing up...';

    // Get value from form element
    var user = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      profile: {
	      birthday: event.target.birthday.value,
	      gender: event.target.gender.value,
	      country: {
	      	code: event.target.country.value
	      }
	    }
    };

    var errors = validateUser(user);
    if (errors.username || errors.email || errors.password || errors.birthday || errors.gender)
      return Session.set('userSubmitErrors', errors);

  	// Post the user to the server for creation
  	Meteor.call('registerAccount', user, function(error, result) {
  		if (error) {
        throwAlert(error.reason, 'danger');
      } else {
      	throwAlert('Your account has been created successfully! An email has been sent to activate your account.', 'success');
      	// Clear form
		    $('.signup')[0].reset()

		    event.target.submit.value = 'Sign up';
		    // Clear form errors
		    Session.set('userSubmitErrors', {});
      }
		});
  }
});