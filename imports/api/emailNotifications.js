import { Meteor } from 'meteor/meteor';

import { Email } from 'meteor/email';

if (Meteor.isServer) {
  Meteor.methods({
    'emailNotifications.sendEmail'(emailAddress, subject, message) { // sends an email to the passed email with the passed content
      Email.send({
        from: "notifications@getyourshitdone.club",
        to: emailAddress,
        subject: subject,
        text: message
      });
    },
  });
}
