Template.userEdit.onCreated(function() {
  Session.set('profileSubmitErrors', {});
});

Template.userEdit.helpers({
  errorMessage: function (field) {
    return Session.get('profileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('profileSubmitErrors')[field] ? 'has-error' : '';
  },
  selectedOption: function (data) {
  	if (data === Meteor.user().profile.status)
       return 'selected'
  }
});

Template.userEdit.events({
  'submit .edit-profile': function(event) {
    event.preventDefault();
    
    var profile = {
      status: event.target.status.value,
      note: event.target.note.value
    }

    var errors = validateProfile(profile);
    if (errors.status || errors.note)
      return Session.set('profileSubmitErrors', errors);

    Meteor.call('updateProfile', profile, function(error, result){
    	if (error) {
        throwAlert(error.reason, 'danger');
      } else {
      	Session.set('profileSubmitErrors', {});
      }
    });

    throwAlert('Your profile has been updated succesfully!', 'success');
  }
});