import { Meteor } from 'meteor/meteor';

Meteor.publish(null, function() {
  return Meteor.users.find(this.userId, {fields: {role: 1}});
});
//
// Meteor.publish('splashpage-user-groups', function() {
//   return Groups.find();
// });
