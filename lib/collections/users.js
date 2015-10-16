Meteor.methods({
  registerAccount: function(user) {
    check(user, {
    	username: String,
    	email: String,
    	password: String,
    	profile: {
	      birthday: String,
	      gender: String,
	      country: {
	      	code: String
	      }
	    }
    });

  	var errors = validateUser(user);
	  if (errors.username || errors.email || errors.password || errors.birthday || errors.gender)
	    throw new Meteor.Error(400, 'Some of your data is not valid. Try that again');

    return Accounts.createUser(user);
  },
  updateProfile: function(newProfile) {
  	check(newProfile, {
      status: String,
      note: String
    });

  	var errors = validateProfile(newProfile);

    if (errors.status || errors.note)
    	throw new Meteor.Error(400, 'Some of your data is not valid. Try that again');

    if(!this.userId) 
      throw new Meteor.Error(404, 'You should be logged-in to perform this action');

    return Meteor.users.update(this.userId, {
    	$set : { 
    		'profile.status': newProfile.status,
        'profile.note': newProfile.note 
      }
    });
  },
  updateRoles: function (userId, roles) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin']))
      throw new Meteor.Error(403, "Access denied")

    Roles.setUserRoles(userId, roles)
  }
});

Meteor.users.deny({
  update: function() {
    return true;
  }
});