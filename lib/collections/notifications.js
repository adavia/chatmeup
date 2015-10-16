Notifications = new Mongo.Collection('notifications');

Meteor.methods({
  readNotification: function(id) {
    check(id, String);

    if (!this.userId)
      throw new Meteor.Error('invalid-message', 'You should be logged-in to read a notification');

    var notification = Notifications.findOne(id);
    if (this.userId !== notification.userId)
    	throw new Meteor.Error('invalid-action', 'You are not allowed to do this.');

    Notifications.update(id, {$set: {read: true}})
	  
    return {
    	imageId: notification.imageId,
    	userId: notification.userId
    };
  }
});

