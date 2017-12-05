import './signup.html';

Template.signup.events({
    'submit .form-signup': function(event) {
        event.preventDefault();
        var firstName = event.target.inputFirstName.value;
        var lastName = event.target.inputLastName.value;

        var emailAddress = event.target.inputEmailAddress.value;
        var phoneNumber = event.target.inputPhoneNumber.value;

        var username = event.target.inputUsername.value;
        var password = event.target.inputPassword.value;
        var passwordCheck = event.target.inputConPassword.value;

        // TODO: better error checking :)

        if (password === passwordCheck) {
          Meteor.call('server.createUser', firstName, lastName, emailAddress, phoneNumber, username, password, function(error, result) {
            if (error) {
              document.getElementById("error-message").innerHTML = error +
                "<br> maybe consider changing this due to security";
            }
            if (result) {
              Meteor.loginWithPassword(username, password, function(error, result) {
                if (error) {
                  document.getElementById("error-message").innerHTML = error +
                    "<br> maybe consider changing this due to security";
                }
              });
            }
          });
        }
        else {
          document.getElementById("error-message").innerHTML = "Error: Your passwords do not match.";
        }
    }
});
