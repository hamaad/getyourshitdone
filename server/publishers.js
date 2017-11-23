import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish(null, function () {
         return Meteor.users.find({}, {fields: {
           _id: 1,
           username: 1,
           firstName: 1,
           lastName: 1,
           emailAddress: 1,
           phoneNumber: 1,
           groupIds: 1,
           groupInvitations: 1}});
  });
}
