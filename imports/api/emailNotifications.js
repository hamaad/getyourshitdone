import { Meteor } from 'meteor/meteor';

import { Email } from 'meteor/email';

if (Meteor.isServer) {
  Meteor.methods({
    // for general email notifications
    'emailNotifications.sendEmail'(emailAddress, subject, message) {
      Email.send({
        from: "notifications@getyourshitdone.club",
        to: emailAddress,
        subject: subject,
        text: message
      });
    },

    // for contact us page
    'emailNotifications.sendContactUsEmail'(emailAddress, message) {
      Email.send({
        from: emailAddress,
        to: "getyourshitdone4@gmail.com",
        subject: "Contact Us -- New Submission",
        text: message
      });
    },

  });
}
