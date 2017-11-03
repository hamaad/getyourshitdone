import { Template } from 'meteor/templating';

import { Groups } from '../api/groups.js';

import './group.html';

Template.group.helpers({
  userCount: function() {
    return this.userIds.length;
  },
  adminName: function() {
    return Meteor.users.findOne(this.adminId).username;
  },
});

Template.group.events({
  'click .leave-group'() {
    Meteor.call('groups.leaveGroup', this._id);
  },
});
