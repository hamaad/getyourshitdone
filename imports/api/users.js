import { Meteor } from 'meteor/meteor';

import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.methods({
    // for general email notifications
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
                            phoneNumber: newPhoneNumber
      }});
    },
  });
}
