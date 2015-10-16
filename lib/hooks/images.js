Images.files.before.update(function (userId, doc, fieldNames, modifier, options) {
	if (modifier.$set.primary) {
		Images.update({userId: userId},{$set:{primary: false}}, {multi:true});
	}
});