import { Template } from 'meteor/templating';

import './forgotPassword.html';

Template.forgotPassword.events({
  'click #forgotPasswordButton' (event) {
    event.preventDefault();

    username = document.getElementById('inputUsername').value;
    emailAddress = document.getElementById('inputEmailAddress').value;
    password = document.getElementById('inputPassword').value;

    Meteor.call('users.changePassword', username, emailAddress, password, function (error, result) {
      if (error) {
        document.getElementById("error-message").innerHTML = error.reason;
      } else {
        document.getElementById("error-message").innerHTML = "Password successfully changed!";
      }
    });

  },
});
