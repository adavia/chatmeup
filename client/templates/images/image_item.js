Template.imageItem.onCreated(function() {
  return this.subscribe('comments', this.data._id);
});

Template.imageItem.helpers({
  ownImage: function() {
    return this.userId === Meteor.userId();
  },
  commentsCount: function() {
  	return Counts.get('image-comments-' + this._id)
  }
});

Template.imageItem.events({
  'click .delete-image': function(event) {
    event.preventDefault();

    var sure = confirm('Are you sure you want to delete this image?');
    
    if (sure === true) {
      Images.remove({ _id:this._id }, function(error,result) {
        if (error) {
          throwAlert('Delete failed... ' + error, 'danger');
        } else {
          throwAlert('This image has been deleted succesfully!', 'success');
        }
      })
    }
  },
  'click .image-item': function(event) {
    event.preventDefault();

    Modal.show('imagePage', {imageId: this._id, userId: this.userId});
  }
});