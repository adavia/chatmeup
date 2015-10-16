Template.logout.events({
  "click .logout": function (event) {
    event.preventDefault();
    Meteor.logout(function(error) {
    	if (!error) {
    		Router.go('login');
    	}
    });
  }
});