import { Meteor } from 'meteor/meteor';

import { check } from 'meteor/check';

import '../imports/api/users.js';
import '../imports/api/tasks.js';
import '../imports/api/groups.js';
import '../imports/api/taskRepeatables.js';
import '../imports/api/emailNotifications.js';

if (Meteor.isServer) {

  Accounts.onCreateUser(function(options, user) {
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
      user.profile = options.profile;
    return user;
  });

  Meteor.methods({
    // this method takes in a string text and a string group id, and inserts a task
    'server.createUser'(firstName, lastName, emailAddress, phoneNumber, username, password) {
      check(firstName, String);
      check(lastName, String);
      check(emailAddress, String);
      check(phoneNumber, String);
      check(username, String);
      check(password, String);

      // create the user!
      userId = Accounts.createUser({
        username: username,
        password: password
      });

      // assign the other user fields!
      Meteor.users.update(userId, {
        $set: {firstName : firstName,
              lastName : lastName,
              emailAddress : emailAddress,
              phoneNumber : phoneNumber,
              groupIds: [],
              assignedTaskIds: [],
              groupInvitations: []},
      });

      // email the user welcoming them to the application!
      subject = "Welcome to getyourshitdone, " + firstName + "!";
      message = "Welcome to getyourshitdone, " + firstName + ". We're lucky to have you. Try creating a group and a task to get started! See you soon.";
      Meteor.call('emailNotifications.sendEmail', emailAddress, subject, message);

      return userId;
    },
  });

  Meteor.startup(() => {
    // code to run on server at startup
  });

}
