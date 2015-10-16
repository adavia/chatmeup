Template.imagesAdd.events({
  'dropped #dropzone': function (event) {
  	var user = Meteor.user();
  	
    FS.Utility.eachFile(event, function(file) {
    	var newFile = new FS.File(file);
    	newFile.username = user.username;
      newFile.userId = user._id;

      // Post the user to the server for creation
	  	Images.insert(newFile, function(error, fileObj) {
	  		if (error) {
          throwAlert('The upload failed. Please try again.', 'danger');
        } else { 	
			    throwAlert('Upload succeeded!', 'success');     
        }
			});
  	});
  }
});