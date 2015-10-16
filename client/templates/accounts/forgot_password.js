Template.forgotPassword.events({  
  "submit .forgot-password": function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    email = event.target.email.value;

    if (email) {
	    Accounts.forgotPassword({email: email}, function (error) {
	      if (error) {
	        if (error.message === 'User not found [403]') {
	          throwAlert('This email address does not exist.', 'danger');
	        } else {
	          throwAlert('We are sorry but something went wrong.', 'danger');
	        }
	      } else {
	        throwAlert('We have sent you an email with basic instructions to reset your password.', 'success');
	        event.target.email.value = '';
	      }
	    });
	  } else {
      throwAlert('Your email address cannot be empty.', 'danger');
    }
  }
});