import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import moment from 'moment';

export const Tasks = new Mongo.Collection('tasks');
if (Meteor.isServer) {

  Meteor.methods({
    // inserting a task!!!!!
    'tasks.addTask'(name, groupId, assignedUserIds, dueDate) {
      check(name, String);
      check(groupId, String);

      taskId = Tasks.insert({
        name: name,
        createdAt: new Date(), // current time
        ownerId: Meteor.userId(),
        groupId: groupId,
        assignedUserIds: assignedUserIds,
        dueDate: dueDate,
        overdue: false,
        finished: false
      });

      // update every user and give them the task
      // also, send them a notification!
      groupName = Meteor.call('groups.getGroupName', groupId);
      ownerFirstName = Meteor.user().firstName;
      for(i = 0; i < assignedUserIds.length; i++)
      {
        currentUserId = assignedUserIds[i];
        Meteor.users.update(currentUserId, {
          $push: { 'assignedTaskIds': taskId},
        });

        currentUser = Meteor.users.findOne(currentUserId);

        currentUserFirstName = currentUser.firstName;
        emailAddress = currentUser.emailAddress;

        subject = "New Task: " + name + "!!!";
        message = "Hey, " + currentUserFirstName + "! You have a new task '" + name + "' assigned by " + ownerFirstName + " in the group " + groupName + "! It's due on " + moment(dueDate).format('MMMM DD YYYY') + "!";
        Meteor.call('emailNotifications.sendEmail', emailAddress, subject, message);
      }

      Meteor.call('groups.addTask', groupId, taskId);
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
      currentTask = Tasks.findOne(taskId);
      var assignedUserIds = currentTask.assignedUserIds;
      var groupId = currentTask.groupId;

      for(i = 0; i < assignedUserIds.length; i++) {
        currentUserId = assignedUserIds[i];
        Meteor.users.update(currentUserId, {
          $pull: { 'assignedTaskIds': taskId},
        });
      }

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

      // if user clicked task is finished, then notify all assigned users that it has been completed by the user
      if (setFinished === true) {
        currentTask = Tasks.findOne(taskId);
        currentTaskName = currentTask.name;
        currentAssignedUserIds = currentTask.assignedUserIds;
        completedByUserFirstName = Meteor.user().firstName;

        for(i = 0; i < currentAssignedUserIds.length; i++) {
          currentUser = Meteor.users.findOne(currentAssignedUserIds[i]);
          currentUserFirstName = currentUser.firstName;
          emailAddress = currentUser.emailAddress;

          subject = "Task completed: " + currentTaskName + "!!!";
          message = "Hey " + currentUserFirstName + ", it looks like " + completedByUserFirstName + " finished the task " + currentTaskName + "! Great work. :)";
          Meteor.call('emailNotifications.sendEmail', emailAddress, subject, message);
        }
      }
    },

    // this method sets a task as overdue or not overdue
    'tasks.setOverdue'(taskId, setOverdue) {
      // do some basic verification of input
      check(taskId, String);
      check(setOverdue, Boolean);

      // update tasks
      Tasks.update(taskId,
        {$set: { 'overdue': setOverdue},
      });

      // for all of the users, notify them
      currentTask = Tasks.findOne(taskId);
      currentTaskName = currentTask.name;
      var assignedUserIds = currentTask.assignedUserIds;

      for(i = 0; i < assignedUserIds.length; i++) {
        currentUser = Meteor.users.findOne(assignedUserIds[i]);
        currentUserFirstName = currentUser.firstName;
        emailAddress = currentUser.emailAddress;
        subject = "Overdue Task: " + currentTaskName + "!!!";
        message = "Hey, " + currentUserFirstName + "! You messed up. You missed the due date for the task " + currentTaskName + "! Fix this now!";
        Meteor.call('emailNotifications.sendEmail', emailAddress, subject, message);
      }
    },

    // @@@@@@ function not used for now @@@@@@
    'tasks.updateName'(taskId, text) {
      Tasks.update(taskId, {
        $set: { 'text': text }
      });
    },
  });
}
