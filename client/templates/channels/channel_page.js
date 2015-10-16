Template.channelPage.onCreated(function() {
	if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function (error) {
      if (error != null) {
        if (error.message = 'Verify email link expired [403]') {
        	throwAlert('Sorry this verification link has expired.', 'danger');
        }
      } else {
      	throwAlert('Thank you! Your email address has been confirmed.', 'success');
      }
      Accounts._verifyEmailToken = false;
    });
  }
});

Template.channelPage.helpers({
	usersCount: function() {
		return Counts.get('users-channel-' + this.channel._id);
	}
});