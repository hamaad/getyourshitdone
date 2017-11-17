import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Tasks } from '../api/tasks.js';
import { Groups } from '../api/groups.js';

import './task.js';
import './group.js';
import './groupview.html';

Template.groupview.helpers({
  userGroups() {
    return Groups.find({userIds: Meteor.userId()});
  },
  allGroups() {
    return Groups.find({});
  },
});

Template.groupview.events({
  'click .join-group'(event) {
    groupId = document.getElementById("group-select").options[document.getElementById("group-select").selectedIndex].value;

    Meteor.call('groups.joinGroup', groupId);
  },

  'click .add-group-button'(event) {
    const groupName = document.getElementById("add-group");

    Meteor.call('groups.newGroup', groupName.value);

    groupName.value = "";
  },
});
