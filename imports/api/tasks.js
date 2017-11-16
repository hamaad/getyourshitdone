import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  // this method takes in a string text and a string group id, and inserts a task
  'tasks.insert'(text, groupId) {
    check(text, String);
    check(groupId, String);

    taskId = Tasks.insert({
      text,
      createdAt: new Date(), // current time
      ownerId: Meteor.userId(),
      assignedUserId: Meteor.userId(),
      groupId: groupId,
    });

    Meteor.users.update(Meteor.userId(), {
      $push: { 'assignedTaskIds': taskId},
    });

  },

  'tasks.assignUser'(taskId, userId) {
    check(taskId, String);
    check(userId, String);

    Tasks.update(taskId, {
      $set: { 'assignedUserId': userId},
    });

    Meteor.users.update(userId, {
      $push: { 'assignedTaskIds': taskId},
    });
  },

  // this method takes in a string taskId and removes it from the collection
  'tasks.remove'(taskId) {
    check(taskId, String);

    var userId = Tasks.findOne(taskId).assignedUserId;
    var groupId = Tasks.findOne(taskId).groupId;

    Meteor.users.update(userId, {
      $pull: {'assignedTaskIds' : taskId}
    });

    Meteor.call('groups.removeTask', groupId, taskId);

    Tasks.remove(taskId);


  },

  // this method takes in a string taskId and a boolean setFinished and updates it in the collection
  'tasks.setFinished'(taskId, setFinished) {
    // do some basic verification of input
    check(taskId, String);
    check(setFinished, Boolean);

    // update tasks
    Tasks.update(taskId,
      {$set: { 'finished': setFinished},
    });
  },

  'tasks.updateName'(taskId, text) {
    Tasks.update(taskId, {
      $set: { 'text': text }
    });
  },
});
