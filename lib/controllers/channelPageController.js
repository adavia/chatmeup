channelPageController = RouteController.extend({
	waitOn: function() {
    return [
    	this.subscribe('channelMessages', this.params._id),
    	this.subscribe('channelUsers', this.params._id)
    ]
  },
  data: function() {
  	var channel = Channels.findOne(this.params._id);
  	if (channel) {
  		var channelMessages = Messages.find({channel: channel._id}, {sort: {createdAt: 1}, limit: 25});
  		var usersChannel = ChannelUsers.find({channel: channel._id, active: true});
	    return {
	    	channel: channel,
	      messages: channelMessages,
	      users: usersChannel
	    }
  	} else {
  		return false;
  	}
  },
  action: function() {
  	channelUser = {
      channel: this.params._id
    };

    if (Meteor.userId()) {
	    Meteor.call('addUserChannel', channelUser, function(error, result) {
	    	if (error) {
	    		throwAlert(error.reason, 'danger');
	    	} else {
	    		if (result && result.exists) {
		        Session.set('userChannelId', result._id);
		    	}
	    	}
	    });
	  }
    // Render the view
    this.render();
  },
  onStop: function() {
    // Remove the user from the list of users.
    var channelId = Session.get('userChannelId');
    if (channelId){
    	Meteor.call('removeUserChannel', channelId, function(error, result) {
    		if (error)
    			throwAlert(error.reason, 'danger');
    	});
    } 
  }
});