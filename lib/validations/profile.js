validateProfile = function (profile) {
  var errors = {};

  if (!profile.status) {
    errors.status = 'Please select a status';
  } else {
  	if (!_.contains(['s', 'm', 'd', 'o'], profile.status)) {
  		errors.status = 'Please select a correct status';
  	}
  }

  if (!profile.note) {
    errors.note = 'Please fill in your note with something brief';
  } else {
  	if (profile.note.length > 200) {
			errors.note = 'Your note should be 200 characters max.';
		}
  }

  return errors;
}