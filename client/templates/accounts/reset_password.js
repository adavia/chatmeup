Template.resetPassword.events({  
  "submit .reset-password": function (event) {
  	// Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    password = event.target.password.value;

    // If the password is valid, we can reset it.
    if (password) {
      Accounts.resetPassword(Accounts._resetPasswordToken, password, function (error) {
        if (error) {
          throwAlert('Sorry but something went wrong. Maybe your link has expired.', 'danger');
        } else {
          throwAlert('Your password has been changed. Welcome back!', 'success');
          Router.go('home');
        }
      });
    } else {
      throwAlert('Your password cannot be empty. Create a good one!', 'danger');
    }
  }
});