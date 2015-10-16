Template.channelsList.onCreated(function() {
  return this.subscribe('allChannels');
});

Template.channelsList.helpers({
  channels: function() {
  	return Channels.find();
  }
});

Template.channelsList.events({
  'click .add-channel': function(event) {
    event.preventDefault();

    Modal.show('channelsAdd');
  }
});