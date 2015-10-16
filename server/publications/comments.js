Meteor.publish('comments', function(imageId, limit) {
  check(imageId, String);
  
  Counts.publish(this, 'image-comments-' + imageId, Comments.find({imageId: imageId}));
  return Comments.find({imageId: imageId}, {limit: limit});
});