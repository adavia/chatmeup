Template.userChannel.onCreated(function() {
	return this.subscribe('userPrimaryImage', this.data.userId);
});

Template.userChannel.helpers({
	ownUser: function() {
    return Meteor.userId() && this.userId != Meteor.userId();
  },
  userBan: function() {
  	if (this.ban === false) {
  		return 'Ban this user';
  	} else {
  		return 'Unban this user';
  	}
  }
});

Template.userChannel.events({
  'click .private': function(event) {
    event.preventDefault();

    Modal.show('messagePrivate', {receiver: this.userId});
  },
  'click .ban': function(event) {
  	event.preventDefault();

  	if (this.ban === false) {
	  	Meteor.call('banUserChannel', this._id, function(error, result) {
	    	if (error) {
	    		throwAlert(error.reason, 'danger');
	    	}
	    });
	  } else {
	  	Meteor.call('unbanUserChannel', this._id, function(error, result) {
	    	if (error) {
	    		throwAlert(error.reason, 'danger');
	    	}
	    });
	  }
  },
  'click .permissions': function(event) {
  	event.preventDefault();

  	Modal.show('userRoles', {userId: this.userId});
  }
});