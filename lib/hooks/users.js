// We wait for Meteor to create the user before sending an email
Meteor.users.after.insert(function (userId, doc) {
  Accounts.sendVerificationEmail(this._id);
});