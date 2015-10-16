Channels = new Meteor.Collection('channels');

Meteor.methods({
  submitChannel: function(channelAtrr) {
    check(channelAtrr, {
      name: String,
      topic: String
    });

    var user = Meteor.user();

    if(!user || !Roles.userIsInRole(user, ['admin'])) 
      throw new Meteor.Error(404, 'You should be logged-in to perform this action');

    var channel = _.extend(channelAtrr, {
      createdAt: new Date(),
      usersCount: 0
    });

    return Channels.insert(channel);
  }
});