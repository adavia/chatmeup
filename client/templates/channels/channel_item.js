Template.channelItem.onCreated(function() {
	return this.subscribe('channelUsers', this.data._id)
});

Template.channelItem.helpers({
	usersChannelCount: function() {
		return Counts.get('users-channel-' + this._id);
	}
});