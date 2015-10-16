Meteor.publish('channelMessages', function(channelId) {
	check(channelId, String)
	
  return Messages.find({channel: channelId}, {sort: {createdAt: -1}, limit: 25});
});