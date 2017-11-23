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
  'click .invite-user-button'() {
    groupId = this._id;

    invitedUsername = document.getElementById("invite-user-textbox" + groupId).value;
    invitedUser = Meteor.users.findOne({"username" : invitedUsername});

    if (invitedUser === undefined) {
      document.getElementById("error-message" + groupId).innerHTML = "Error: No user found!";
    } else {
      Meteor.call('groups.inviteUser', groupId, invitedUser._id, Meteor.userId(), function(error) {
        if (error) {
          document.getElementById("error-message" + groupId).innerHTML = error.reason;
        } else {
          document.getElementById("error-message" + groupId).innerHTML = ("Invitation to " + invitedUsername + " sent!");
        }
      });
    }
  },
});
