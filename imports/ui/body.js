import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import { Tasks } from '../api/tasks.js';
import { Groups } from '../api/groups.js';

import './task.js'
import './group.js'
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
})

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // if hide is chcked, filter the tasks returned
      return Tasks.find({checked: { $ne: true}, assignedUserId:  Meteor.userId()}, { sort: { createdAt: -1 } });
    }

    return Tasks.find({assignedUserId: Meteor.userId(), }, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true }, ownerId:  Meteor.userId() }).count();
  },
  userGroups() {
    return Groups.find({userIds: Meteor.userId()});
  },
  allGroups() {
    return Groups.find({});
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    groupId = document.getElementById("task-group-select").options[document.getElementById("task-group-select").selectedIndex].value;

    // Insert a task into the collection
    taskId = Meteor.call('tasks.insert', text, groupId);

    Meteor.call('tasks.assignUser', taskId, Meteor.userId());

    // Clear form
    target.text.value = '';
  },
  'submit .new-group'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.text.value;

    Meteor.call('groups.newGroup', name);

    // Clear form
    target.text.value = '';
  },

  'click .join-group'(event) {
    groupId = document.getElementById("group-select").options[document.getElementById("group-select").selectedIndex].value;

    Meteor.call('groups.joinGroup', groupId);
  },

  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
