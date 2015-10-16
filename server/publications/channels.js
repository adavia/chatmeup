Meteor.publish('allChannels', function() {
  return Channels.find();
});