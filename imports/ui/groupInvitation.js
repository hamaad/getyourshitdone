import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Groups } from '../api/groups.js';

import './groupInvitation.html';


Template.groupInvitation.helpers({
  hostUsername: function() {
    return Meteor.users.findOne(this.hostUserId).username;
  },
  groupName: function() {
    return Groups.findOne(this.groupId).name;
  },
});

Template.groupInvitation.events({
  'click #accept'(event) {
    Meteor.call('groups.acceptGroupInvitation', this.groupId);
  },

  'click #decline'(event) {
    Meteor.call('groups.declineGroupInvitation', this.groupId);
  },
});
