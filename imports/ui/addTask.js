import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import { Tasks } from '../api/tasks.js';
import { Groups } from '../api/groups.js';

import './task.js';
import './group.js';
import './addTask.html';


Template.addTask.helpers({
  userGroups() {
    return Groups.find({userIds: Meteor.userId()});
  },
});

Template.addTask.events({
  'change #task-group-select'(event) {
    groupId = document.getElementById("task-group-select")
              .options[document.getElementById("task-group-select").selectedIndex]
              .value;

    Meteor.call('groups.getUserIds', groupId, (error, result) => {

      userIdsElement = document.getElementById("task-users-select");

      userIdsElement.options.length = 0;

      for (i = 0; i < result.length; i++) {
        option = document.createElement("option");
        option.value = result[i];
        option.text = Meteor.users.findOne(result[i]).username;
        userIdsElement.add(option);
      }

    });


  },

  'click .add-task-button'(event) {
    name = document.getElementById("add-task").value;

    groupId = document.getElementById("task-group-select")
              .options[document.getElementById("task-group-select").selectedIndex]
              .value;

    dueDate = document.getElementById("due-date");

    // Insert a task into the collection
    Meteor.call('tasks.insert', name, groupId);

    // clear textbox
    name.value = "";
  },
});
