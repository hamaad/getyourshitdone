import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';

import { Tasks } from '../api/tasks.js';
import { Groups } from '../api/groups.js';

import './task.js';
import './group.js';
import './splashpage.js';
import './groupview.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.currentPage = new ReactiveVar("splashpage");
})

Template.body.helpers({
  page: function() {
    return Template.instance().currentPage.get();
  },
});

Template.body.events({
  'click #nav-selectable': function( event, template ) {
    var currentPage = $( event.target ).closest( "li" );

    currentPage.addClass( "active" );
    $( ".navbar-nav li" ).not( currentPage ).removeClass( "active" );

    template.currentPage.set( currentPage.data( "template" ) );
  },

  'click .dropdown-item': function( event, template ) {
    var options = $( event.target ).closest( "li" );
    var currentPage = $( event.target ).closest( "a" );

    options.addClass( "active" );
    $( ".navbar-nav li" ).not( options ).removeClass( "active" );

    template.currentPage.set( currentPage.data( "template" ) );
  },

});
