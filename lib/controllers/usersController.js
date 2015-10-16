usersController = infiniteScrollingController.extend({
  increment: 8,
  subscriptions: function () {
    return [
	    this.subscribe('users', {
	      sort: {
	        createdAt: -1
	      },
	      limit: this.limit()
	    }),
	    this.subscribe('countries')
	  ]
  },
  users: function () {
    return Meteor.users.find({}, {
      sort: {
        createdAt: -1
      },
      limit: this.limit()
    });
  },
  data: function() {
    return {
      users: this.users(),
      ready: this.ready()
    };
  },
  count: function () {
    return Counts.get('allUsers');
  }
});