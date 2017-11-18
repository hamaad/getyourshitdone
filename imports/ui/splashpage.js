import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import { Tasks } from '../api/tasks.js';
import { Groups } from '../api/groups.js';

import './task.js';
import './group.js';
import './splashpage.html';

Template.splashpage.helpers({
  userGroups() {
    return Groups.find({userIds: Meteor.userId()});
  },
  tasks() {
    return Tasks.find({assignedUserId: Meteor.userId(), }, { sort: { createdAt: -1 } });
  },
});

Template.splashpage.events({
  'click .add-task-button'(event) {

    text = document.getElementById("add-task");

    groupId = document.getElementById("task-group-select")
              .options[document.getElementById("task-group-select").selectedIndex]
              .value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', text.value, groupId);

    // clear textbox
    text.value = "";
  },
});
