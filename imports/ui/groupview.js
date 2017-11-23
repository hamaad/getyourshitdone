import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Tasks } from '../api/tasks.js';
import { Groups } from '../api/groups.js';

import './task.js';
import './group.js';
import './groupInvitation.js';
import './groupview.html';


Template.groupview.helpers({
  userInvitations() {
    return Meteor.users.findOne(Meteor.userId()).groupInvitations;
  },
  userGroups() {
    return Groups.find({userIds: Meteor.userId()});
  },
});

Template.groupview.events({
  'click .add-group-button'(event) {
    const groupName = document.getElementById("add-group");

    Meteor.call('groups.newGroup', groupName.value);

    groupName.value = "";
  },
});
