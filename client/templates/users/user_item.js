Template.userItem.onCreated(function() {
	return this.subscribe('userPrimaryImage', this.data._id);
});

Template.userItem.helpers({
  gender: function() {
    if (this.profile.gender === "m") {
    	return Spacebars.SafeString("<i class='fa fa-male'></i>");
    } else {
    	return Spacebars.SafeString("<i class='fa fa-female'></i>");
    }
  },
  country: function() {
  	return Countries.findOne({code: this.profile.country.code});
  }
});