Privates = new Meteor.Collection('privates');

Meteor.methods({
  privateInsert: function(privateAttributes) {
    check(privateAttributes, {
      receiver: String,
      content: String
    });

    var errors = validateMessage(privateAttributes);
	  if (errors.content)
	    throw new Meteor.Error(400, "Some of your data is not valid. Try that again");

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error('invalid-message', 'You should be logged-in to send a private');
    
    var isUser = Meteor.users.findOne(privateAttributes.receiver);
    if (!isUser)
      throw new Meteor.Error('invalid-user', 'This is not a valid receiver');

    var message = _.extend(privateAttributes, {
      sender: user._id,
      username: user.username,
      createdAt: new Date(),
      read: false
    });

    // create the comment, save the id
    message._id = Privates.insert(message);
  
    return message._id;
  },
  readPrivate: function(sender) {
    check(sender, String);

    if (!this.userId)
      throw new Meteor.Error('invalid-message', 'You should be logged-in to read a private');

    var conversation = Privates.find({sender: sender, receiver: this.userId});
    if (conversation.length <= 0)
    	throw new Meteor.Error('invalid-action', 'You are not allowed to do this.');

    if (!this.isSimulation) {
	    Meteor.defer(function(){
	    	Privates.update({sender: sender}, {$set: {read: true}}, {multi: true});
	    });
	  }
	  
    return sender;
  }
});