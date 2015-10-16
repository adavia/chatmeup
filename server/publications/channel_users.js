Meteor.publish('channelUsers', function(channelId) {
	check(channelId, String);
	
	Counts.publish(this, 'users-channel-' + channelId, ChannelUsers.find({channel: channelId, active: true}));
  return ChannelUsers.find({channel: channelId, active: true});
});