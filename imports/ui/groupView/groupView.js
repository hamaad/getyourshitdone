import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Groups } from '../../api/groups.js';

import './group.js';
import './groupInvitation.js';
import './groupView.html';


Template.groupView.helpers({
  userInvitations() {
    return Meteor.users.findOne(Meteor.userId()).groupInvitations;
  },
  userGroups() {
    return Groups.find({userIds: Meteor.userId()});
  }
});

Template.groupView.events({
  'click .add-group-button'(event) {
    const groupName = document.getElementById("add-group");

    Meteor.call('groups.newGroup', groupName.value);

    groupName.value = "";
  },
});
