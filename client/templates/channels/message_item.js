Template.messageItem.onCreated(function() {
	return this.subscribe('userPrimaryImage', this.data.userId);
});

Template.messageItem.onRendered(function () {
  scrollTop();
});

function scrollTop() {
	var content = $('.message-wrapper');
  return content.scrollTop(content.prop("scrollHeight"));
}