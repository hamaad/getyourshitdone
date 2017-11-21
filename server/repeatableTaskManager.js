import { Meteor } from 'meteor/meteor';

import { Tasks } from '../imports/api/tasks.js';
import { TaskRepeatables } from '../imports/api/taskRepeatables.js';

import { check } from 'meteor/check';

import moment from 'moment';

if (Meteor.isServer) {
  Meteor.setInterval(function(){ //cycles daily to append tasks from repeatabletasks collection to task collection and user collection
    time = moment();
    currentDay = time.format('dddd'); // Monday, Tuesday
    currentDate = time.format('Do'); //1st, 2nd, 31st

    //Meter.call('taskRepeatable.taskRepeatable')

    taskRepeatableCollection = TaskRepeatables.find({});
    for(currentRepeatableTaskIndex=0; currentRepeatableTaskIndex < taskRepeatableCollection.length; currentRepeatableTaskIndex++) {
      currentRepeatableTask = taskRepeatableCollection[currentRepeatableTaskIndex];

      groupId = currentRepeatableTask.groupId;
      lastDate = currentRepeatableTask.previousAssignedDate;
      lastUser = currentRepeatableTask.previousAssignedUser;
      repeatedDays = currentRepeatableTask.repeatedDays;
      assignedUserIds = currentRepeatableTask.assignedUserIds;
      dayInterval = currentRepeatableTask.dayInterval;


    }

  }, 1000); //1000-> 1 sec


}
