import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Groups = new Mongo.Collection('groups');
if (Meteor.isServer) {
  Meteor.methods({
    'groups.newGroup'(name) {
      // Insert a new group into the collection
      groupId = Groups.insert({
        name,
        createdAt: new Date(), // current time
        adminId: Meteor.userId(),
        userIds: [Meteor.userId()],
        taskIds: [],
        taskRepeatableIds: []
      });

      Meteor.users.update(Meteor.userId(), {
        $push: { 'groupIds' : groupId },
      });
    },

    'groups.inviteUser'(groupId, invitedUserId, hostUserId) {
      invitedUser = Meteor.users.findOne(invitedUserId);

      // check if invited user is already in this group
      invitedUserGroupIds = invitedUser.groupIds;
      for (i = 0; i < invitedUserGroupIds.length; i++) {
        currentGroupId = invitedUserGroupIds[i];

        if (currentGroupId === groupId) {
          throw new Meteor.Error("user-already-in-group", "Error: User is already in this group.");
        }
      }

      // check if invited user has already been invited to this group
      invitedUserGroupInvitations = invitedUser.groupInvitations;
      for(i = 0; i < invitedUserGroupInvitations.length; i++) {
        currentInvitation = invitedUserGroupInvitations[i];

        if (currentInvitation.groupId === groupId) {
          throw new Meteor.Error("invitation-already-exists", "Error: User has already been invited to this group.");
        }
      }

      // else, invite them and notify them!
      hostUserFirstName = Meteor.users.findOne(hostUserId).firstName;

      invitedUserFirstName = invitedUser.firstName;
      invitedUserEmailAddress = invitedUser.emailAddress;

      groupName = Groups.findOne(groupId).name;

      subject = "New group invitation to: " + groupName + "!";
      message = "Hey, " + invitedUserFirstName + "! You have a been invited to '" + groupName + "' by " + hostUserFirstName + "! Visit getyourshitdone.club to accept or decline!";
      Meteor.call('emailNotifications.sendEmail', invitedUserEmailAddress, subject, message);

      Meteor.users.update(invitedUserId, {
        $push: {"groupInvitations" : {"groupId" : groupId, "hostUserId" : hostUserId}}
      });
    },

    'groups.acceptGroupInvitation'(groupId) {
      check(groupId, String);

      if (Groups.find({_id: groupId}).length !== 0) { // if the group is actually a real group...
        if(Meteor.user().groupIds.includes(groupId) === false) // i.e. if it is NOT found in the array, then add
        {
          Groups.update(groupId, {
            $push: { 'userIds' : Meteor.userId() },
          });

          Meteor.users.update(Meteor.userId(), {
            $push: { 'groupIds' : groupId },
          });
        }
      }

      Meteor.users.update(Meteor.userId(), {
        $pop: {"groupInvitations" : {"groupId" : groupId}}
      });
    },

    'groups.declineGroupInvitation'(groupId) {
      Meteor.users.update(Meteor.userId(), {
        $pop: {"groupInvitations" : {"groupId" : groupId}}
      });
    },

    'groups.leaveGroup'(groupId) {
      Groups.update(groupId, {
        $pull: { 'userIds': Meteor.userId()},
      });

      Meteor.users.update(Meteor.userId(), {
        $pull: { 'groupIds': groupId },
      });
      // if there are no more users, delete the group and all corresponding group invitations
      if (Groups.findOne(groupId).userIds.length < 1)
      {
        Groups.remove(groupId);
      }
      // else if there are users, make the next "first" user an admin
      else if (Groups.findOne(groupId).adminId == Meteor.userId())
      {
        Groups.update(groupId,
        {
          $set: {'adminId': Groups.findOne(groupId).userIds[0]},
        });
      }
    },

    'groups.addTask'(groupId, taskId) {
      Groups.update(groupId, {
        $push: {'taskIds': taskId},
      });
    },

    'groups.removeTask'(groupId, taskId) {
      Groups.update(groupId, {
        $pull: {'taskIds': taskId},
      });
    },

    'groups.addRepeatableTask'(groupId, taskId) {
      Groups.update(groupId, {
        $push: {'taskRepeatableIds': taskId},
      });
    },

    'groups.removeRepeatableTask'(groupId, taskId) {
      Groups.update(groupId, {
        $pull: {'taskRepeatableIds': taskId},
      });
    },

    'groups.getGroupName'(groupId) {
      return Groups.findOne(groupId).name;
    },

    'groups.getUserIds'(groupId) {
      return Groups.findOne(groupId).userIds;
    },

  });

}
