Template.messagePrivate.onCreated(function() {
	return [
		this.subscribe('singleUser', this.data.receiver),
		this.subscribe('privateMessage', Meteor.userId(), this.data.receiver)
	]
});

Template.messagePrivate.helpers({
  messages: function () {
  	var sender = Meteor.userId();
  	var receiver = this.receiver;
  	return Privates.find({
	    $or : [
	      { $and : [{sender: sender }, {receiver: receiver }] },
	      { $and : [{sender: receiver }, {receiver: sender }] }
	    ]
		}, {sort: {createdAt: 1}, limit: 20});
  }
});