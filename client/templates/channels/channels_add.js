Template.channelsAdd.onCreated(function() {
  Session.set('channelSubmitErrors', {});
});

Template.channelsAdd.helpers({
  errorMessage: function(field) {
    return Session.get('channelSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('channelSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.channelsAdd.events({
	'submit .form-channel': function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var channel = {
      name: event.target.name.value,
      topic: event.target.topic.value
    };

    var errors = validateChannel(channel);
    if (errors.name || errors.topic)
      return Session.set('channelSubmitErrors', errors);

  	// Post the user to the server for creation
  	Meteor.call('submitChannel', channel, function(error, result) {
  		if (error) {
        throwAlert(error.reason, 'danger');
      } else {
      	throwAlert('This channel has been added succesfully', 'success');
      	// Clear form
		    $('.form-channel')[0].reset()
		    // Clear form errors
		    Session.set('channelSubmitErrors', {});
      }
		});
  }
});