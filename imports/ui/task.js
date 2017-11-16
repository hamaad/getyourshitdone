import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';
import { Groups } from '../api/groups.js';

import './task.html';

Template.task.helpers({
  getAssignedUsername: function() {
    return Meteor.users.findOne(this.assignedUserId).username;
  },
  getGroupName: function() {
    return Groups.findOne(this.groupId).name;
  },
});

Template.task.events({
  'click .task-complete'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setFinished', this._id, !this.finished);
  },
  'click .task-delete'() {
    Meteor.call('tasks.remove', this._id);
  },

  'submit .update-task-name'(event) {
    // this doesn't work yet. : )
    event.preventDefault();

    Meteor.call('tasks.updateName', this._id, event.target.text.value);

    event.target.text.value = '';
  },

});
