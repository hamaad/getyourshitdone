import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import { Tasks } from '../api/tasks.js';
import { Groups } from '../api/groups.js';

import './task.js';
import './splashpage.html';

Template.splashpage.helpers({
  tasks() {
    return Tasks.find({assignedUserIds: Meteor.userId(), }, { sort: { createdAt: -1 } });
  },
});
