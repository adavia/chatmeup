Template.messagePrivateItem.onCreated(function() {
	return this.subscribe('userPrimaryImage', this.data.sender);
});

Template.messagePrivateItem.onRendered(function () {
	var template = this;

  this.autorun(function () {
    if (template.subscriptionsReady()) {
      Tracker.afterFlush(function () {
        scrollTop();
      });
    }
  });
});

function scrollTop() {
	var content = $('.private-wrapper');
  return content.scrollTop(content.prop("scrollHeight"));
}