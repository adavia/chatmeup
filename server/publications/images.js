Meteor.publish('singleImage', function(id) {
  check(id, String)

  if(this.userId) {
  	return Images.find(id);
  }
});

Meteor.publish('images', function(options, userId) {
  check(options, {
    sort: Object,
    limit: Number
  });

  var findQuery = {};
  if (userId) {
    check(userId, String);
    findQuery = { userId : userId };
  }

  Counts.publish(this, 'user-images-' + userId, Images.find(findQuery));

  return Images.find(findQuery, options);
});

Meteor.publish('userPrimaryImage', function(userId) {
	check(userId, String)
	
  return Images.find({userId: userId, primary: true});
});