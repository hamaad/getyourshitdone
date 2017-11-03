import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Groups = new Mongo.Collection('groups');

Meteor.methods({
  'groups.newGroup'(name) {
    // Insert a new group into the collection
    groupId = Groups.insert({
      name,
      createdAt: new Date(), // current time
      adminId: Meteor.userId(),
      userIds: [Meteor.userId()],
      taskIds: []
    });

    Meteor.users.update(Meteor.userId(), {
      $push: { 'groupIds' : groupId },
    });
  },

  'groups.joinGroup'(groupId) {
    if( Meteor.users.findOne(Meteor.userId()).groupIds.indexOf(groupId) < 0) // i.e. if it is NOT found in the array, then add
    {
      Groups.update(groupId, {
        $push: { 'userIds' : Meteor.userId() },
      });

      Meteor.users.update(Meteor.userId(), {
        $push: { 'groupIds' : groupId },
      });
    }
    else {
      // TODO: tell user they are already part of the group
    }
  },

  'groups.leaveGroup'(groupId) {
    Groups.update(groupId, {
      $pull: { 'userIds': Meteor.userId()},
    });

    Meteor.users.update(Meteor.userId(), {
      $pull: { 'groupIds': groupId },
    });
    if (Groups.findOne(groupId).userIds.length < 1)
    {
      Groups.remove(groupId);
    }
    else if (Groups.findOne(groupId).adminId == Meteor.userId())
    {
      Groups.update(groupId,
      {
        $set: {'adminId': Groups.findOne(groupId).userIds[0]},
      });
    }
  },

  'groups.removeTask'(groupId, taskId) {
    Groups.update(groupId, {
      $pull: {'taskIds': taskId},
    });
  },

  'groups.getGroupName'(groupId) {
    return Groups.findOne(groupId).name;

  },

});
