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

      // do something
      userId = Accounts.createUser({
        username: username,
        password: password
      });

      Meteor.users.update(userId, {
        $set: {firstName : firstName,
              lastName : lastName,
              emailAddress : emailAddress,
              phoneNumber : phoneNumber,
              groupIds: [],
              assignedTaskIds: [],
              groupInvitations: []},
      });

      return userId;
    },
  });

  Meteor.startup(() => {
    // code to run on server at startup
  });

}
