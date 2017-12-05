import './contactUs.html';

Template.contactUs.events({
  'click #submitContactUsButton'(event) {
    event.preventDefault();

    emailAddress = Meteor.user().emailAddress;
    message = document.getElementById('messageText').value;

    Meteor.call('emailNotifications.sendContactUsEmail', emailAddress, message, function(error, result) {
      if (error) {
        document.getElementById('error-message').innerHTML = error;
      } else {
        document.getElementById('messageText').value = "";
        document.getElementById('error-message').innerHTML = "Message sent!";
      }
    });
  },
});
