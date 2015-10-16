Template.userImages.helpers({
  moreResults: function() {
    var ctrl = Iron.controller();
    return ctrl.state.get('limit') < ctrl.count();
  },
  userNote: function(note) {
  	if (note) {
  		return note;
  	} else {
  		return 'Nothing to say yet..';
  	}
  },
  userStatus: function(status) {
  	switch (status) {
  		case 's':
  			return 'Single';
  			break;
  		case 'm':
  			return 'Married';
  			break;
  		case 'd':
  			return 'Divorced';
  			break;
  	}
  }
});

Template.userImages.events({
  'click #showMoreResults': function(event) {
    event.preventDefault();

    var ctrl = Iron.controller();
    ctrl.state.set('limit', ctrl.state.get('limit') + ctrl.increment);
  }
});