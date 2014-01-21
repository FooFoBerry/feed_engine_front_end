// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
// require handlebars
// require ember
// require ember-data

//= require jquery
//= require 'handlebars'
//= require 'ember'
//= require 'ember-data'
//= require 'ember-pusher.min'
//= require 'md5'
//= require_self

App = Ember.Application.create({
  PUSHER_OPTS: { key: '3568c8046d9171a5f8ee', connection: {} }
});

App.Router.map(function() {
  // put your routes here
});

App.IndexView = Ember.View.extend({
  didInsertElement: function() {
    console.log('INSERTED');
  }
});

App.IndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('notifications', model.ghNotifications);
    controller.set('users', model.users);
  },
  model: function() {
    return Em.RSVP.hash({
      ghNotifications: this.store.find('GHNotification'),
      users: this.store.find('GHNotification') // to be changed to user
    });
  }
});

App.IndexController = Ember.ObjectController.extend(EmberPusher.Bindings, {
  notifications: [],
  users: [],
  project_id: 0,
  init: function() {
    var pieces = window.location.pathname.split('/'),
        project_id = pieces[ pieces.length -1 ];
    //this.PUSHER_SUBSCRIPTIONS['project_' + project_id] = ['github_notification'];
  },
  PUSHER_SUBSCRIPTIONS: {
    activity_channel: ['new_idea'],
    //github_notification: ['project_' + this.project_id]
  },
  createNotification: function(data) {
    debugger;
    this.store.createRecord('GHNotification', { name: "Nathaniel", email: "asdf"});
  },
  sortedNotifications: Ember.computed.sort('notifications', function(a, b) {
    if (a.id > b.id) {
      return -1;
    }
    if (a.id < b.id) {
      return 1;
    }
    return 0;
  }),
  actions: {
    githubNotification: function(data) { this.createNotification(data); },
    newIdea: function(data) { this.createNotification(data); }
  },
  notificationsUpdated: function() {
    Ember.run.next(this, function() {
      var notifications = $('.notification.hidden');
      if (notifications) {
        $.each(notifications, function(index, notification) {
          setTimeout(function() {
            $(notification).addClass('visible').removeClass('hidden');
          }, 1);
        });
      }
    });
  }.observes('this.notifications.@each')
});

App.GithubNotificationComponent = Ember.Component.extend({
  size: 65,
  gravatarUrl: function() {
    var size = this.get('size'),
        email = this.notification.get('email');
    return 'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
  }
});

App.ApplicationAdapter = DS.FixtureAdapter;

App.GHNotification = DS.Model.extend({
  name         : DS.attr(),
  email        : DS.attr(),
  bio          : DS.attr(),
  avatarUrl    : DS.attr(),
  creationDate : DS.attr()
});

App.GHNotification.FIXTURES = [
  {
    id: 1,
    name: 'Tyler Long',
    email: 'tyler.stephen.long@gmail.com',
    bio: 'The Coolest Cast EVA',
    avatarUrl: 'https://2.gravatar.com/avatar/4164b853dcf6cad5fae8af49de2e12b5?x&s=400',
    creationDate: 'Mon, 26 Aug 2013 2013 20:23:43 GMT'
  },
  {
    id: 2,
    name: 'Nathaniel Watts',
    email: 'reg@nathanielwatts.com',
    bio: 'The Coolest DAWG EVA',
    avatarUrl: 'https://1.gravatar.com/avatar/c12d3710dada4fe5f9abfe4c783ff636?x&s=400',
    creationDate: 'Mon, 07 Aug 2013 2013 10:23:43 GMT'
  }
];

