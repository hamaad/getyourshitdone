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

// Template.splashpage.onRendered(function() {
//   console.log("Our script is running");
//   //$(document).ready(function() {
//   console.log("ready!");
//
//   //write a function that does something when the new task is pressed
//   //This function gets called when the user wants to add a task card to their list of tasks
//
//   var taskList = [];
//
//   // $('#add-task-button').click(function() {
//   //    console.log("The user clicked on the new task button.");
//   //
//   //    // We need to grab the text form the input text field
//   //    var taskName = $('#add-task').val();
//   //
//   //    /*Tasks.insert({
//   //      taskName,
//   //      createdAt: new Date(), // current time
//   //      ownerId: Meteor.userId(),
//   //      assignedUserId: Meteor.userId(),
//   //      groupId: null,
//   //    });
//   //    */
//   //
//   //   addTask(taskName, taskList);
//   //   appendTaskToTaskList(taskName);
//   //   makeCardsRemovable();
//   //
//   // });
//   var initializeTasks = function() {
//       makeCardsRemovable();
//   }
//   var makeCardsRemovable = function() {
//       $('.task-card .task-delete .fa-close').each(function() {
//
//           var taskWrapper = $(this).parent().parent().parent();
//
//           $(this).click(function(e) {
//               e.preventDefault();
//               console.log('Deleting');
//              taskWrapper.remove();
//              removeTask();
//           });
//       });
//   }
//   var removeTask = function() {
//       console.log("Remove task from list");
//   }
//   var addTask = function(taskName, list) {
//       console.log("Adding a task");
//       console.log("The name of the task is : " + taskName );
//
//      list.push(taskName);
//
//      console.log("Current tasks: " + list);
//   }
//   var appendTaskToTaskList = function(taskName) {
//       $('.task-cards').append("<div class='col-4 task-card-wrapper'><div class=' task-card in-progress'><h3 class='task-name'>" + taskName + "</h3><div class = 'task-due-date'><span class='task-date'>" + "date" + "</span><span class='task-status-text'>overdue!</span></div><div class = 'task-complete'><i class='fa fa-check-square'></i></div><div class = 'task-delete'><i class='fa fa-close'></i></div><div class ='task-edit'>edit</div></div></div>");
//   }
//
//   //add a task card, with the name of the thing that was submitted
//
//   //});
//
// });
