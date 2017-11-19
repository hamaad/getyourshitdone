import './login.html';

Template.login.events({
  'submit .form-signin': function(event) {
    event.preventDefault();
    var username = event.target.inputUsername.value;
    var password = event.target.inputPassword.value;
    Meteor.loginWithPassword(username, password, function(error, result) {
      if (error) {
        document.getElementById("error-message").innerHTML = error +
          "<br> maybe consider changing this due to security";
      }
    });
  },
});
