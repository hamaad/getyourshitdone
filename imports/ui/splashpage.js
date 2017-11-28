import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Tasks } from '../api/tasks.js';
import { Groups } from '../api/groups.js';

import './task.js';
import './splashpage.html';

Template.splashpage.onCreated(function splashpageOnCreated() {
  Session.set('currentAnonymousPage', 'login');
})

Template.splashpage.helpers({
  tasks() {
    return Tasks.find({assignedUserIds: Meteor.userId(), }, { sort: { createdAt: -1 } });
  },
});
