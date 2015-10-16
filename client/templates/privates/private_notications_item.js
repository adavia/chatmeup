Template.privateNotificationItem.events({
  'click a.read-private': function(event) {
  	event.preventDefault();

  	Meteor.call('readPrivate', this.sender, function(error, result) {
  		if (error) {
        throwAlert(error.reason, 'danger');
      } else {
      	Modal.show('messagePrivate', {receiver: result});
      }
		});
  }
});

Template.privateNotificationItem.helpers({
	contentLimit: function() {
    return this.content.substring(0, 40);
  }
});