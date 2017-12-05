import { Groups } from '../api/groups.js';

import './profile.html';

Template.profile.helpers({
  getUserDocument() {
    return Meteor.user();
  },
  userGroups() {
    return Groups.find({userIds: Meteor.userId()});
  },
});

Template.profile.events({
  'click #update-profile-button'() {
    newFirstName = document.getElementById('newFirstNameText').value;
    newLastName = document.getElementById('newLastNameText').value;
    newEmailAddress = document.getElementById('newEmailAddressText').value;
    newPhoneNumber = document.getElementById('newPhoneNumberText').value;

    Meteor.call('users.updateProfile', Meteor.userId(), newFirstName, newLastName, newEmailAddress, newPhoneNumber, function(error, result) {
      if (error) {
        document.getElementById("error-message").innerHTML = error;
      } else {
        document.getElementById("error-message").innerHTML = "User updated!";
      }
    });
  },
});
