validateComment = function (comment) {
  var errors = {};

  if (!comment.content) {
    errors.content = 'Please fill in your comment with something!';
  } else {
  	if (comment.content.length > 200) {
			errors.content = 'Your comment should be 200 characters max.';
		}
  }

  return errors;
}