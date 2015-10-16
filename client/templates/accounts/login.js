Template.login.events({
	"submit .login": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    event.target.submit.value = 'Signing in...';

    // Get value from form element
    email = event.target.email.value;
    password = event.target.password.value;
    
    // Login the user and redirect
    Meteor.loginWithPassword(email, password, function (error) {
      if (error) {
      	event.target.submit.value = 'Sign in';

      	if (error.message === 'Match failed [400]') {
      		throwAlert('Your credentials are not correct. Try that again!', 'danger');
      	} else if (error.message === 'User not found [403]') {
      		throwAlert('This email address does not exist.', 'danger');
      	} else {
        	throwAlert(error.reason, 'danger');
        }
      } else {
        Router.go('home');
      }
    });
  }
});