Template.imagePage.onCreated(function() {
  return this.subscribe('singleImage', this.data.imageId);
});

Template.imagePage.helpers({
  image: function() {
    return Images.findOne(this.imageId);
  },
  isPrimaryChecked: function(value) {
    return (value === true ? 'checked' : '');
  },
  ownImage: function(userId) {
    return userId === Meteor.userId();
  }
});

Template.imagePage.events({
  'click .edit-details': function(event) {
  	event.preventDefault();
  	$('.image-form').toggle();
  }
});