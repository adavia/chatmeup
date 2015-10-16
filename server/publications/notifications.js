Meteor.publish('notifications', function() {
	Counts.publish(this, 'unread-notifications', Notifications.find({userId: this.userId, read: false}));
	if (this.userId) {
  	return Notifications.find({userId: this.userId, read: false}, {limit: 10});
  }
});