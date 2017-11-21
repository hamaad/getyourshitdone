import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import { Tasks } from '../api/tasks.js';
import { Groups } from '../api/groups.js';
import { TaskRepeatables } from '../api/taskRepeatables.js';

import './task.js';
import './group.js';

import '../ui/account/dashboard.js';
import '../ui/account/login.js';
import '../ui/account/signup.js';
import '../ui/account/forgotPassword.js';

import './splashpage.js';
import './profile.js';
import './addTask.js';
import './groupview.js';


import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.currentUserPage = new ReactiveVar("splashpage");
  this.currentAnonymousPage = new ReactiveVar("login");
})

Template.body.helpers({
  userPage: function() {
    return Template.instance().currentUserPage.get();
  },
  anonymousPage: function() {
    return Template.instance().currentAnonymousPage.get();
  },
});

Template.body.events({
  // Logged in navigation bar events
  'click #nav-selectable': function( event, template ) {
    var currentUserPage = $( event.target ).closest( "li" );

    currentUserPage.addClass( "active" );
    $( ".navbar-nav li" ).not( currentUserPage ).removeClass( "active" );

    template.currentUserPage.set( currentUserPage.data( "template" ) );
  },
  'click .dropdown-item': function( event, template ) {
    var options = $( event.target ).closest( "li" );
    var currentUserPage = $( event.target ).closest( "a" );

    options.addClass( "active" );
    $( ".navbar-nav li" ).not( options ).removeClass( "active" );

    template.currentUserPage.set( currentUserPage.data( "template" ) );
  },

  // Logged out dashboard events
  'click #navigateLogin': function(event, template) {
    document.getElementById("navigateLogin").style = "color:black; border:3px solid green; border-radius: 12px;";
    document.getElementById("navigateSignUp").style = "color:black;";
    document.getElementById("navigateForgotPassword").style = "color:black;";

    template.currentAnonymousPage.set("login");
  },
  'click #navigateSignUp': function(event, template) {
    document.getElementById("navigateLogin").style = "color:black;";
    document.getElementById("navigateSignUp").style = "color:black; border:3px solid green; border-radius: 12px;";
    document.getElementById("navigateForgotPassword").style = "color:black;";

    template.currentAnonymousPage.set("signup");
  },
  'click #navigateForgotPassword': function(event, template) {
    document.getElementById("navigateLogin").style = "color:black;";
    document.getElementById("navigateSignUp").style = "color:black;";
    document.getElementById("navigateForgotPassword").style = "color:black; border:3px solid green; border-radius: 12px;";

    template.currentAnonymousPage.set("forgotPassword");
  },
});
