Template.channelMessage.onCreated(function() {
	Session.set('messageSubmitErrors', {});
});

Template.channelMessage.helpers({
	errorMessage: function (field) {
    return Session.get('messageSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('messageSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.channelMessage.events({
  'submit .send-message': function(event) {
    event.preventDefault();

    var message = {
    	channel: this.channel._id,
    	content: event.target.content.value
    }

    var errors = validateMessage(message);
    if (errors.content)
      return Session.set('messageSubmitErrors', errors);

    Meteor.call('messageInsert', message, function(error, messageId) {
      if (error){
        throwAlert(error.reason, 'danger');
      } else {
        event.target.content.value = '';
        Session.set('messageSubmitErrors', {});
      }
    });
  }
});