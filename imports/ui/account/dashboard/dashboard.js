import { Session } from 'meteor/session';

import './dashboard.html';

Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Session.set('currentUserPage', 'splashpage');
        Meteor.logout();
    }
});
