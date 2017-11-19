import { Groups } from '../api/groups.js';

import './profile.html';

Template.profile.helpers({
  getUserDocument() {
    return Meteor.users.findOne(Meteor.userId());
  },
  userGroups() {
    return Groups.find({userIds: Meteor.userId()});
  },
});
