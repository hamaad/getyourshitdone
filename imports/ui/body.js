import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import { Tasks } from '../api/tasks.js';
import { Groups } from '../api/groups.js';
import { TaskRepeatables } from '../api/taskRepeatables.js';

import moment from 'moment';

// import './task.js';
// import './group.js';

import '../ui/account/dashboard/dashboard.js';
import '../ui/account/login/login.js';
import '../ui/account/signup/signup.js';
import '../ui/account/forgotPassword/forgotPassword.js';

import './splashpage.js';
import './profile.js';
import './groupView/groupView.js';

import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  Session.set('currentUserPage', 'splashpage');
  Session.set('currentAnonymousPage', 'login');
})

Template.body.helpers({
  userPage: function() {
    return Session.get('currentUserPage');
  },
  anonymousPage: function() {
    return Session.get('currentAnonymousPage');
  },
  // for adding tasks below
  userGroups() {
    return Groups.find({userIds: Meteor.userId()});
  },
});

Template.body.events({
  // general logged in navigation bar events
  'click #nav-selectable': function( event, template ) {
    var currentUserPage = $( event.target ).closest( "li" );

    currentUserPage.addClass( "active" );
    $( ".navbar-nav li" ).not( currentUserPage ).removeClass( "active" );

    Session.set('currentUserPage', currentUserPage.data("template"));
  },
  // ****
  // logged in add task
  'change #task-group-select'(event) {
    groupId = document.getElementById("task-group-select")
              .options[document.getElementById("task-group-select").selectedIndex]
              .value;

    Meteor.call('groups.getUserIds', groupId, (error, result) => {

      userIdsElement = document.getElementById("task-users-select");

      userIdsElement.options.length = 0;

      for (i = 0; i < result.length; i++) {
        option = document.createElement("option");
        option.value = result[i];
        option.text = Meteor.users.findOne(result[i]).username;
        userIdsElement.add(option);
      }
    });
  },

  'click .add-task-button'(event) {

    taskName = document.getElementById("add-task").value;
    groupId = document.getElementById("task-group-select")
              .options[document.getElementById("task-group-select").selectedIndex]
              .value;
    dueDate = document.getElementById("dateName").valueAsDate;
    //dueDate.setHours(dueDate.getHours() + 6);
    isRepeatable = document.getElementById("addTaskRepeatableChecked").checked;
    //create assignedUserIds[]
    assignedUserIdPool = $('#task-users-select').val();
    repeatableType = $("input[name='repeatBy']:checked").val();
    //created repeatableDays[]
    repeatableDays = [];
    repeatableDaysLength = $('#days-select :selected').length
    for(x=0; x < repeatableDaysLength; x++) {
      repeatableDays[x] = document.getElementById('days-select')
                .options[x]
                .value;
    }
    repeatedFactor = document.getElementById("add-x-day").value;
    console.log("add task button has been pressed");
    console.log('name: ' + taskName);
    console.log('groupId: ' + groupId);
    console.log('dueDate: ' + dueDate);
    console.log('is repeatable? ' + isRepeatable);
    console.log('assignedUserIds: ' + assignedUserIdPool);
    console.log('repeatableType: ' + repeatableType);
    console.log('repeatableDays: ' + repeatableDays);
    console.log('repeatedFactor: ' + repeatedFactor);

    // normal task
    if (!isRepeatable) {
      Meteor.call('tasks.addTask', taskName, groupId, assignedUserIdPool, dueDate);
    } else {
      console.log("not added yet.");
      // repeatable task
      //Meteor.call('taskRepeatables.newTaskRepeatables', taskName, groupId, repeatableDays, assignedUserIdPool);
    }
  },
  // end logged in add task
  // ****

  // logged in options
  'click .dropdown-item': function( event, template ) {
    var options = $( event.target ).closest( "li" );
    var currentUserPage = $( event.target ).closest( "a" );

    options.addClass( "active" );
    $( ".navbar-nav li" ).not( options ).removeClass( "active" );

    Session.set('currentUserPage', currentUserPage.data("template"));
  },

  // Logged out dashboard events
  'click #navigateLogin': function(event, template) {
    document.getElementById("navigateLogin").style = "color:black; border:3px solid green; border-radius: 12px;";
    document.getElementById("navigateSignUp").style = "color:black;";
    document.getElementById("navigateForgotPassword").style = "color:black;";

    Session.set('currentAnonymousPage', 'login');
  },
  'click #navigateSignUp': function(event, template) {
    document.getElementById("navigateLogin").style = "color:black;";
    document.getElementById("navigateSignUp").style = "color:black; border:3px solid green; border-radius: 12px;";
    document.getElementById("navigateForgotPassword").style = "color:black;";

    Session.set('currentAnonymousPage', 'signup');
  },
  'click #navigateForgotPassword': function(event, template) {
    document.getElementById("navigateLogin").style = "color:black;";
    document.getElementById("navigateSignUp").style = "color:black;";
    document.getElementById("navigateForgotPassword").style = "color:black; border:3px solid green; border-radius: 12px;";

    Session.set('currentAnonymousPage', 'forgotPassword');
  },
});
