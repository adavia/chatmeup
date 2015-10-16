// Now create a notification, informing the user that there's been a comment
Comments.after.insert(function (userId, doc) {
	var image = Images.findOne(doc.imageId);
  if (doc.userId !== image.userId) {
    Notifications.insert({
      userId: image.userId,
      imageId: image._id,
      commentId: doc._id,
      commenterName: doc.author,
      read: false,
      createdAt: new Date()
    });
  }
});