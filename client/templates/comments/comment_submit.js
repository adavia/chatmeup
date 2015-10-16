Template.commentSubmit.onCreated(function() {
	Session.set('commentSubmitErrors', {});
});

Template.commentSubmit.helpers({
	errorMessage: function (field) {
    return Session.get('commentSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.commentSubmit.events({
  'submit form': function(event) {
    event.preventDefault();

    var comment = {
      content: event.target.content.value,
      imageId: this.imageId
    };

    var errors = validateComment(comment);
    if (errors.content)
      return Session.set('commentSubmitErrors', errors);

    Meteor.call('commentInsert', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        event.target.content.value = '';
        Session.set('commentSubmitErrors', {});
      }
    });
  }
});