Messages = new Meteor.Collection('messages');

Meteor.methods({
  messageInsert: function(messageAttributes) {
    check(messageAttributes, {
      channel: String,
      content: String
    });

    var errors = validateMessage(messageAttributes);
	  if (errors.content)
	    throw new Meteor.Error(400, "Some of your data is not valid. Try that again");

    var user = Meteor.user();

    if (!user)
      throw new Meteor.Error('invalid-message', 'You should be logged-in to start chatting');

    var channel = Channels.findOne(messageAttributes.channel);
    if (!channel)
      throw new Meteor.Error('invalid-channel', 'You must message on a real channel');

    var isBanned = ChannelUsers.findOne({userId: user._id, channel: channel._id});

    if (isBanned && isBanned.ban === true) 
    	throw new Meteor.Error('banned', 'You have been banned from this channel');

    var message = _.extend(messageAttributes, {
      userId: user._id,
      username: user.username,
      createdAt: new Date()
    });

    // create the comment, save the id
    message._id = Messages.insert(message);
  
    return message._id;
  }
});