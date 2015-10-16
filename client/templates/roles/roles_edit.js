Template.userRoles.onCreated(function() {
	return this.subscribe('singleUser', this.data.userId);
});

Template.userRoles.helpers({
  userRoles: function(){
  	var user = Meteor.users.findOne(this.userId);

    return {
    	username: user.username,
    	roles: 
    		[{ 
      		label: 'Grant admin permissions', 
      		name: 'admin', 
      		checked: user.roles.indexOf('admin') >- 1 ? 'checked' : ''
      	},
      	{ 
      		label: 'Grant moderator permissions', 
      		name: 'moderator', 
      		checked: user.roles.indexOf('moderator') >- 1 ? 'checked' : '' 
      	}]
    };
  }
});

Template.userRoles.events({
	'submit .form-roles': function (event, template) {
    // Prevent default browser form submit
    event.preventDefault();

    var roles = template.findAll("input[type=checkbox]:checked");

    var rolesArray = _.map(roles, function(item) {
     	return item.defaultValue;
   	});

   	// Update user roles
  	Meteor.call('updateRoles', this.userId, rolesArray, function(error, result) {
  		if (error) {
        throwAlert(error.reason, 'danger');
      } else {
      	throwAlert('This roles has been updated successfully', 'success');
      }
		});
  }
});