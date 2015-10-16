ChannelUsers.after.update(function (userId, doc, fieldNames, modifier, options) {
	if (modifier.$set.ban === true) {
		Messages.insert({
      channel: doc.channel,
      content: 'Has been banned from this channel.',
      userId: doc.userId,
      username: doc.username,
      createdAt: new Date()
    });
	} else {
		if (modifier.$set.ban === false) {
			Messages.insert({
	      channel: doc.channel,
	      content: 'Has been unbanned from this channel.',
	      userId: doc.userId,
	      username: doc.username,
	      createdAt: new Date()
    	});
		}
	}
});