if (Meteor.isServer) {
  var imageStore = new FS.Store.S3('original', {
    /* REQUIRED */
    accessKeyId: Meteor.settings.private.AWSAccessKeyId, 
    secretAccessKey: Meteor.settings.private.AWSSecretAccessKey, 
    bucket: Meteor.settings.private.AWSBucket,
    folder: 'original'
  });

  var thumbStore = new FS.Store.S3('thumb', {
	  accessKeyId: Meteor.settings.private.AWSAccessKeyId,
	  secretAccessKey: Meteor.settings.private.AWSSecretAccessKey, 
	  bucket: Meteor.settings.private.AWSBucket,
	  folder: 'thumb',
	  transformWrite: function(fileObj, readStream, writeStream) {
    	gm(readStream, fileObj.name()).autoOrient().resize('200', '200', "^").gravity('Center').extent('200', '200').stream().pipe(writeStream);
  	}
	});

  Images = new FS.Collection('images', {
    stores: [imageStore, thumbStore],
    filter: {
    	maxSize: 3145728,
      allow: {
        contentTypes: ['image/*'],
    		extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
      }
    }
  });
}

// On the client just create a generic FS Store as don't have
// access (or want access) to S3 settings on client
if (Meteor.isClient) {
  var imageStore = new FS.Store.S3('images');
  var thumbStore = new FS.Store.S3('thumbs');
  
  Images = new FS.Collection('images', {
    stores: [imageStore, thumbStore],
    filter: {
    	maxSize: 3145728,
      allow: {
        contentTypes: ['image/*'],
    		extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
      },
      onInvalid: function(message) {
        throwAlert(message, 'danger');
      }
    }
  });
}

Meteor.methods({
  updateImage: function(imageId, details) {
  	check(imageId, String);
    check(details, {
      description: String,
      primary: Boolean
    });

    var errors = validateImage(details);
	  if (errors.description)
	    throw new Meteor.Error(400, 'Some of your data is not valid. Try that again');

	  if (!this.userId)
	  	throw new Meteor.Error('invalid-edit', 'You are not logged-in to perform this action');

	  var image = Images.findOne(imageId);

	  if (this.userId != image.userId)
    	throw new Meteor.Error('not-allowed', 'You are not allowed to do this');
    
    return Images.update(imageId, {$set: details});
  }
});

// Allow rules
Images.allow({
  insert: function (userId, image) { return userId && image.userId === userId; },
  remove: function (userId, image) { return userId && image.userId === userId; },
  download: function(userId) { return true; }
});