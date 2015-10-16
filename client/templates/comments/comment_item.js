Template.commentItem.onCreated(function() {
	return this.subscribe('userPrimaryImage', this.data.userId);
});

Template.commentItem.onRendered(function () {
	var template = this;

  this.autorun(function () {
    if (template.subscriptionsReady()) {
      Tracker.afterFlush(function () {
        scrollTop();
      });
    }
  });
});

Template.commentItem.helpers({
  ownComment: function() {
    return this.userId === Meteor.userId();
  }
});

Template.commentItem.events({
  'click .delete-comment': function (event) {
    event.preventDefault();

    var sure = confirm('Are you sure you want to delete this comment?');
    
    if (sure === true) {
	    Meteor.call('deleteComment', this._id, function(error, result) {
	      if (error) {
	        throwAlert(error.reason, 'danger');
	      }
	    });
	  } 
  }
});

function scrollTop() {
	var content = $('.comment-list');
  return content.scrollTop(content.prop("scrollHeight"));
}