Template.imageDetails.onCreated(function() {
	Session.set('imageSubmitErrors', {});
});

Template.imageDetails.helpers({
	errorMessage: function (field) {
    return Session.get('imageSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('imageSubmitErrors')[field] ? 'has-error' : '';
  },
  image: function() {
    return Images.findOne(this.imageId);
  },
  isPrimaryChecked: function(value) {
    return (value === true ? 'checked' : '');
  }
});

Template.imageDetails.events({
  'submit .edit-image': function(event) {
    event.preventDefault();

    var image = {
      description: event.target.description.value,
      primary: event.target.primary.checked
    }

    var errors = validateImage(image);
    if (errors.description)
      return Session.set('imageSubmitErrors', errors);
    
  	 Meteor.call('updateImage', this.imageId, image, function(error, result) {
      if (error) {
        throwAlert(error.reason, 'danger');
      } else {
        Session.set('imageSubmitErrors', {});
        throwAlert('Your image has been updated succesfully!', 'success');
      }
    });  
  }
});