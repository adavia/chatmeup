Template.header.events({
  'click .profile': function(event) {
    event.preventDefault();

    Modal.show('userEdit');
  }
});