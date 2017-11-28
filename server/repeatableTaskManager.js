import { Meteor } from 'meteor/meteor';

import { Tasks } from '../imports/api/tasks.js';
import { TaskRepeatables } from '../imports/api/taskRepeatables.js';

import { check } from 'meteor/check';

import moment from 'moment';
/*
if (Meteor.isServer) {
  Meteor.setInterval(function(){ //cycles daily to append tasks from repeatabletasks collection to task collection and user collection
    time = moment();
    currentDay = time.format('dddd'); // Monday, Tuesday
    currentDate = time.format('Do'); //1st, 2nd, 31st

    //Meter.call('taskRepeatable.taskRepeatable')


    nextSevenDays = [];
    nextSevenDates = [];
    for(x=0; x < 7; x++) {
      nextDate = time.add(x+1, 'days');
      nextSevenDays[x] = nextDate.format('dddd');
      //nextDay = nextDate.format('Do');
      nextSevenDates[x] = nextDate.format('Do');
    }

    taskRepeatableCollection = TaskRepeatables.find({});
    for(currentRepeatableTaskIndex=0; currentRepeatableTaskIndex < taskRepeatableCollection.length; currentRepeatableTaskIndex++) {
      currentRepeatableTask = taskRepeatableCollection[currentRepeatableTaskIndex];

      taskId = currentRepeatableTask.id;
      taskName = currentRepeatableTask.name;
      groupId = currentRepeatableTask.groupId;
      lastDate = currentRepeatableTask.previousAssignedDate;
      lastUser = currentRepeatableTask.previousAssignedUser;
      repeatedDays = currentRepeatableTask.repeatedDays;
      assignedUserIds = currentRepeatableTask.assignedUserIds;
      dayInterval = currentRepeatableTask.dayInterval;
      dayIntervalArrPosition = currentRepeatableTask.dayIntervalArrPosition;
      assignedUserIdsArrPosition = currentRepeatableTask.assignedUserIdsArrPosition;

      if(lastDate == null) {
        current
      }

      for(x=0; x < repeatedDays.length x++) {
        for(j=0; j < nextSevenDays.length; j++) {
          if (repeatedDays[x] == nextSevenDays[j]) {
            Meteor.call('tasks.insert', taskName, groupId); //REVISE task.insert to pass more info
          }
        }
      }
    }

  }, 1000); //1000-> 1 sec 86_400_000 ->24 Hours

}*/
