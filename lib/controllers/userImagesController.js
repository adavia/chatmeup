userImagesController = infiniteScrollingController.extend({
  increment: 6,
  subscriptions: function () {
    return [
	    this.subscribe('images', {
	      sort: {
	        uploadedAt: -1
	      },
	      limit: this.limit()
	    },
	    this.params._id),
	    this.subscribe('singleUser', this.params._id)
	  ]
  },
  images: function () {
    return Images.find({userId: this.params._id}, {
      sort: {
        uploadedAt: -1
      },
      limit: this.limit()
    });
  },
  user: function() {
  	return Meteor.users.findOne(this.params._id);
  },
  data: function() {
    return {
      images: this.images(),
      user: this.user(),
      ready: this.ready()
    };
  },
  count: function () {
    return Counts.get('user-images-' + this.params._id);
  }
});