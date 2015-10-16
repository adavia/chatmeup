ChannelUsers = new Meteor.Collection('channelusers');

Meteor.methods({
  addUserChannel: function(attr) {
    check(attr, {
      channel: String
    });

    var user = Meteor.user();

    var channel = Channels.findOne(attr.channel);
    if (!channel)
      throw new Meteor.Error(404, 'This is not a real channel');

    if(!user) 
      throw new Meteor.Error(404, 'You should be logged-in to perform this action');

    var isInChannel = ChannelUsers.findOne({userId: user._id, channel: attr.channel});

    if (!isInChannel) {
    	var userChannel = _.extend(attr, {
	      userId: user._id,
	      username: user.username,
	      active: true,
	      ban: false
    	});

    	return ChannelUsers.insert(userChannel);

    } else if (isInChannel && isInChannel.active === false) {
    	ChannelUsers.update(isInChannel._id, {$set: {active: true}});
    } else {
    	if (isInChannel && isInChannel.active === true) {
	    	return {
	        exists: true,
	        _id: isInChannel._id
	      }
	    }
    }
  },
  removeUserChannel: function(id) {
  	check(id, String);

  	var user = Meteor.user();
  	
  	var checkUserChannel = ChannelUsers.findOne(id);
  	if (checkUserChannel && checkUserChannel.active) {
  		ChannelUsers.update(id, {$set: {active: false}});
  	}
  },
  banUserChannel: function(id) {
  	check(id, String);

  	var user = Meteor.user();
  	if(!user || !Roles.userIsInRole(user, ['admin','moderator'])) 
      throw new Meteor.Error(404, 'You are not allowed to perform this action');

  	ChannelUsers.update(id, {$set: {ban: true}});
  },
  unbanUserChannel: function(id) {
  	check(id, String);

  	var user = Meteor.user();
  	if(!user || !Roles.userIsInRole(user, ['admin','moderator'])) 
      throw new Meteor.Error(404, 'You are not allowed to perform this action');

  	ChannelUsers.update(id, {$set: {ban: false}});
  }
});