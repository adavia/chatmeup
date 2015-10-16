Accounts.onCreateUser(function(options, user) {
  if (options.profile) {
	  options.profile.birthday = moment(options.profile.birthday, 'DD-MM-YYYY').toDate();
	}
	user.profile = options.profile;

  return user;
});

Accounts.validateLoginAttempt(function(attempt){
  if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
  	throw new Meteor.Error(403, 'This account is not verified. Check your email address.');
    
    // The login is aborted
    return false;
  }
  return true;
}); 