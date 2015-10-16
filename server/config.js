Meteor.startup(function() {
  // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
  Accounts.emailTemplates.from = 'ChatmeUP <no-reply@chatmeup.com>';

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = 'ChatmeUP Staff';

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return 'ChatmeUP - email verification';
  };

  // A Function that takes a user object and a url, and returns the body text for the email.
  // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    var token = url.substring(url.lastIndexOf('/') + 1, url.length);
    var newUrl = Meteor.absoluteUrl('verify-email/' + token);
    var str = 'Thanks for being part!, \n';
        str+= 'Click on the following link to verify your email address: \n';
        str+= newUrl;
    return str;
  };

  Accounts.emailTemplates.resetPassword.text = function(user, url) {
    var token = url.substring(url.lastIndexOf('/') + 1, url.length);
    var newUrl = Meteor.absoluteUrl('reset-password/' + token);
    var str = 'Hello, \n';
        str+= 'Click on the following link to reset your password: \n';
        str+= newUrl;
    return str;
  };

  //SET DEFAULTS

  Accounts.config({
    forbidClientAccountCreation: true
	});
});