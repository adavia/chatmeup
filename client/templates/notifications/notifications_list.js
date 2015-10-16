Template.notifications.onCreated(function() {
	return this.subscribe('notifications');
});

Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false}, {sort: {createdAt: -1}});
  },
  notificationCount: function(){
  	var msgCount = Counts.get('unread-notifications');
  	if (msgCount != 0) {
			return msgCount;
  	}
  }
});