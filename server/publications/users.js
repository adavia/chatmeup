Meteor.publish('users', function(options) {
	Counts.publish(this, 'allUsers', Meteor.users.find());

	if(this.userId) {
  	return Meteor.users.find({}, {fields: {username: 1, profile: 1}}, options);
  }
});

Meteor.publish('singleUser', function(id) {
  check(id, String)

  if(this.userId) {
  	return Meteor.users.find(id, {fields: {username: 1, roles: 1, profile: 1}});
  }
});