import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const TaskRepeatables = new Mongo.Collection('taskRepeatables');
if (Meteor.isServer) {
  //When a new taskRepetables is being callled create new 'taskrepeteables' collection
  Meteor.methods({
    'taskRepeatables.newGroup'(taskRepeatableName, groupId, repeatedDays, assignedUserIds) {
      //check data that is being passed into taskrepeteables
      check(taskRepeatableName, String);
      check(groupId, String);
      //WSID???? SHOULD I CHECK IF THE INFO IS PREINPUTED????
      check(repeatedDays, Array);
      check(assignedUserIds, Array)

      //Insert a new taskRepeatable into the collection
      taskRepeatableId = taskRepeatables.insert({
        name: taskRepeatableName,
        createdAt: new Date(), // current time
        adminId: Meteor.userId(),
        groupId: groupId,
        repeatedDays: repeatedDays,
        assignedUserIds: assignedUserIds,
      });

      //Pushes taskRepeatables to groupIds
      Meteor.groups.update(Meteor.userId(), {
        $push: { 'taskRepeatableIds' : taskRepeatableId },
      });

    },
  });
}
