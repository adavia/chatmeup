Template.privateNotifications.onCreated(function() {
	return this.subscribe('unreadPrivates');
});

Template.privateNotifications.helpers({
	unread_messages: function() {
    return Privates.find({receiver: Meteor.userId(), read: false}, {sort: {createdAt: -1}});
  },
  unreadMessagesCount: function() {
  	var msgCount = Counts.get('unread-messages');
  	if (msgCount != 0) {
			return msgCount;
  	}
  }
});