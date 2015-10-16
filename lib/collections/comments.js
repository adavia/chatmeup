Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(commentAttributes, {
      imageId: String,
      content: String
    });

    var user = Meteor.user();
    var image = Images.findOne(commentAttributes.imageId);
    if (!image)
      throw new Meteor.Error('invalid-image', 'You must comment on a real image');

    if (!user)
      throw new Meteor.Error('invalid-comment', 'You should be logged-in to comment this image');

    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    // create the comment, save the id
    comment._id = Comments.insert(comment);
  
    return comment._id;
  },
  deleteComment: function(id) {
    check(id, String);

    var user = Meteor.user();

    if (!user)
      throw new Meteor.Error('invalid-comment', 'You should be logged-in to remove comment');

    var comment = Comments.findOne(id);
    if (comment.userId != user._id)
      throw new Meteor.Error('invalid-action', 'You are not allowed to perform this action');

    Comments.remove(id);
  }
});