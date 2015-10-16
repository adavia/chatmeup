Template.privateAdd.onCreated(function() {
	Session.set('privateSubmitErrors', {});
});

Template.privateAdd.helpers({
	errorMessage: function (field) {
    return Session.get('privateSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('privateSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.privateAdd.events({
  'submit .send-private': function(event) {
    event.preventDefault();

    var message = {
    	receiver: this.receiver,
    	content: event.target.content.value
    }

    var errors = validateMessage(message);
    if (errors.content)
      return Session.set('privateSubmitErrors', errors);

    Meteor.call('privateInsert', message, function(error, privateId) {
      if (error){
        throwAlert(error.reason, 'danger');
      } else {
        event.target.content.value = '';
        Session.set('privateSubmitErrors', {});
      }
    });
  }
});