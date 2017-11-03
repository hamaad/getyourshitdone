import { Meteor } from 'meteor/meteor';

import '../imports/api/tasks.js';
import '../imports/api/groups.js';

Accounts.onCreateUser(function(options, user) {
  user.groupIds = [];
  user.assignedTaskIds = [];
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
  return user;
});

Meteor.startup(() => {
  // code to run on server at startup
});
