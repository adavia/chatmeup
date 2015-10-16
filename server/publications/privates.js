Meteor.publish('privateMessage', function(sender, receiver) {
	check(sender, String)
	check(receiver, String)

	if(this.userId && this.userId === sender || this.userId === receiver) {
	  return Privates.find({
	    $or : [
	      { $and : [{sender: sender }, {receiver: receiver }] },
	      { $and : [{sender: receiver }, {receiver: sender }] }
	    ]
		}, {sort: {createdAt: -1}, limit: 20});
	}
});

Meteor.publish('unreadPrivates', function() {
	Counts.publish(this, 'unread-messages', Privates.find({receiver: this.userId, read: false}));

	if(this.userId) {
  	return Privates.find({receiver: this.userId, read: false}, {limit: 10});
  }
});