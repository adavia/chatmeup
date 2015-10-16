Template.commentsList.onCreated(function() {
  var instance = this;

  // Initialize the reactive variables
  instance.loaded = new ReactiveVar(0);
  instance.limit = new ReactiveVar(5);

  // Will re-run when the "limit" reactive variables changes
  instance.autorun(function () {

    // Get the limit
    var limit = instance.limit.get();

    // Subscribe to the posts publication
    var subscription = instance.subscribe('comments', instance.data.imageId, limit);

    // If subscription is ready, set limit to newLimit
    if (subscription.ready()) {
      instance.loaded.set(limit);
    }
  });

  // 3. Cursor
  instance.comments = function() { 
  	return Comments.find({imageId: instance.data.imageId}, {limit: instance.loaded.get()});
  }
});

Template.commentsList.helpers({
  comments: function() {
    return Template.instance().comments();
  },
  // Are there more comments to show?
  hasMoreComments: function () {
    return Template.instance().comments().count() >= Template.instance().limit.get();
  }
});

Template.commentsList.events({
  'click .load-more': function (event, instance) {
    event.preventDefault();

    // Get current value for limit, i.e. how many comments are currently displayed
    var limit = instance.limit.get();

    // Increase limit by 5 and update it
    limit += 5;
    instance.limit.set(limit);
  }
});