import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import { Tasks } from '../api/tasks.js';
import { Groups } from '../api/groups.js';
import { TaskRepeatables } from '../api/taskRepeatables.js';

import './task.js';
import './group.js';
import './addTask.html';

import moment from 'moment';


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
    console.log("add task button has been pressed")
    taskName = document.getElementById("add-task").value;
    console.log('name: ' + taskName);
    groupId = document.getElementById("task-group-select")
              .options[document.getElementById("task-group-select").selectedIndex]
              .value;
    console.log('groupId: ' + groupId);

    dueDate = document.getElementById("dateName").value;
    console.log('dueDate: ' + dueDate);

    //created repeatableDays[]
    repeatableDays = [];
    repeatableDaysLength = $('#days-select :selected').length
    for(x=0; x < repeatableDaysLength; x++) {
      repeatableDays[x] = document.getElementById('days-select')
                .options[x]
                .value;
    }
    console.log('repeatableDays: ' + repeatableDays);

    //create assignedUserIds[]
    assignedUserIdPool = [];
    assignedUserIdPoolLength = $('#task-users-select :selected').length
    for(x=0; x < assignedUserIdPoolLength; x++) {
      assignedUserIdPool[x] = document.getElementById('task-users-select')
                .options[x]
                .value;
    }
    console.log('assignedUserIds: ' + assignedUserIdPool);

    h = moment().add(1, 'days');
    tomorrow = h.format('dddd');

    hx = moment().add(2, 'months');

    console.log(hx);
    console.log(tomorrow);
    //Meteor.call('taskRepeatables.newTaskRepeatables', taskName, groupId, repeatableDays, assignedUserIdPool);
    // Insert a task into the collection
    //Meteor.call('tasks.insert', name, groupId);

    // clear textbox
    name.value = "";
  },
});
