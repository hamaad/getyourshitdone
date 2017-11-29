import { Meteor } from 'meteor/meteor';

import { Tasks } from '../imports/api/tasks.js';

import { check } from 'meteor/check';

import moment from 'moment';

if (Meteor.isServer) {
  Meteor.setInterval(function(){ //cycles daily to append tasks from repeatabletasks collection to task collection and user collection
    // get yesterday, at 12:01AM. we want yesterday to be > dueDate if they're on the same day
    yesterday = moment().startOf('day').subtract(1, 'days').add(1, 'minutes');
    console.log("xd");

    // remove finished tasks if day has passed
    allFinishedTasks = Tasks.find({finished: true}).fetch();
    for (currentTaskIndex = 0; currentTaskIndex < allFinishedTasks.length; currentTaskIndex++) {
      currentTask = allFinishedTasks[currentTaskIndex];
      console.log("Going through task " + currentTask.name)
      dueDate = moment(currentTask.dueDate);

      if (dueDate < yesterday) {
        console.log("due date's day has passed for " + currentTask.name);
        Meteor.call('tasks.remove', currentTask._id);
      } else {
        console.log("due date's day HAS NOT PASSED!!! for " + currentTask.name);
        // remove this else after finished testing
      }
    }


  }, 5000); //1000-> 1 sec
}
