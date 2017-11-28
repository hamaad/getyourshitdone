import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import moment from 'moment';

export const TaskRepeatables = new Mongo.Collection('taskRepeatables');
if (Meteor.isServer) {
  //When a new taskRepetables is being callled create new 'taskrepeteables' collection
  Meteor.methods({
    'taskRepeatables.newTaskRepeatables'(taskRepeatableName, groupId, repeatedDays, assignedUserIds, repeatableType) {
      //check data that is being passed into taskrepeteables
      check(taskRepeatableName, String);
      check(groupId, String);
      //WSID???? SHOULD I CHECK IF THE INFO IS PREINPUTED????
      check(repeatedDays, Array);
      check(assignedUserIds, Array)

      //currentDay = moment().format('dddd')
      //Insert a new taskRepeatable into the collection
      taskRepeatableId = TaskRepeatables.insert({
        name: taskRepeatableName,
        createdAt: new Date(), // current time
        adminId: Meteor.userId(),
        groupId: groupId,
        repeatedDays: repeatedDays,
        assignedUserIds: assignedUserIds,
        previousAssignedDate: null,
        previousAssignedUser: null,
        //dayInterval: [], //can be pushed from fronten
        dayIntervalArrPosition: null,
        assignedUserIdsArrPosition: null
        //repeatableType: repeatableType,
      });

      //Pushes taskRepeatables to groupIds
      Meteor.call('groups.addRepeatableTask', groupId, taskRepeatableId);

    }/*,
    'taskRepeatables.updatePreviousAssingedDate' (taskRepeatableId, previousAssignedDate, newDate) {
      $push:
    },*/
  });
}
