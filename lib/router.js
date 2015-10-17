Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
	name: 'home',
	onBeforeAction: function() {
    this.redirect('/channels/CKfFzEEK6Ba7qgyZz');
  }
});

Router.route('/login', {
	name: 'login'
});

Router.route('/signup', {
	name: 'signup',
	waitOn: function() { 
		return Meteor.subscribe('countries'); 
	}
});

Router.route('/forgot-password', {
	name: 'forgotPassword'
});

Router.route('/reset-password/:token', {
  name: 'resetPassword',
  onBeforeAction: function() {
    Accounts._resetPasswordToken = this.params.token;
    this.next();
  }
});

Router.route('/verify-email/:token', {
  name: 'verifyEmail',
  onBeforeAction: function() {
    Accounts._verifyEmailToken = this.params.token;
    this.next();
  },
  template: 'channelPage'
});

Router.route('/users', {
	name: 'usersList',
	controller: usersController
  /*
  onBeforeAction: function() {
  	if (this.data()) {
      var userId = this.data().map(function(u) { 
      	Meteor.subscribe('userPrimaryImage', u._id);
      });
    }
    this.next();
  }
  */
});

Router.route('/users/:_id/images', {
	name: 'userImages',
	controller: userImagesController
});

Router.route('/channels/:_id', {
  name: 'channelPage',
  controller: channelPageController
});

var requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

var isAuthenticated = function() {
  if (Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      Router.go('home');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound',  {only: ['channelPage', 'userImages']});
Router.onBeforeAction(requireLogin,    {only: ['usersList', 'userImages']});
Router.onBeforeAction(isAuthenticated, {only: ['signup', 'login', 'forgotPassword', 'resetPassword', 'verifyEmail']});