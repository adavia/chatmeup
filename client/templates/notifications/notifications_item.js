Template.notificationItem.onCreated(function() {
  return Meteor.subscribe('singleImage', this.data.imageId);
});

Template.notificationItem.events({
  'click a.read-notification': function(event) {
  	event.preventDefault();

  	Meteor.call('readNotification', this._id, function(error, result) {
  		if (error) {
        throwAlert(error.reason, 'danger');
      } else {
      	Modal.show('imagePage', result);
      }
		});
  }
});