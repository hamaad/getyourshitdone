import { Meteor } from 'meteor/meteor';

import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.methods({
    // function to edit the profile to be called from the profile page
    'users.updateProfile'(userId, newFirstName, newLastName, newEmailAddress, newPhoneNumber) {
      check(userId, String);
      check(newFirstName, String);
      check(newLastName, String);
      check(newEmailAddress, String);
      check(newPhoneNumber, String);

      // TODO: future error checking to make sure email, phone number, etc are valid

      Meteor.users.update(userId, {$set:
                          { firstName: newFirstName,
                            lastName: newLastName,
                            emailAddress: newEmailAddress,
                            phoneNumber: newPhoneNumber }
                          });
    },
    'users.changePassword'(username, userEmail, password) {
      check(username, String);
      check(userEmail, String);
      check(password, String);

      currentUser = Meteor.users.findOne({"username" : username});
      currentUserId = currentUser._id;
      currentUserEmailAddress = currentUser.emailAddress;

      if (currentUserEmailAddress === userEmail) {
        Accounts.setPassword(currentUserId,password);
      } else {
        throw new Meteor.Error("email-not-matching", "Error: Email doesn't match user's email.");
      }

    },
  });
}
