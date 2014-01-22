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
//= require handlebars
//= require ember
//= require ember-data
//= require ember-pusher.min
//= require md5
//= require moment.min
//= require_self

window.count = 3;
window.pwn = function() {
  App.__container__.lookup('store:main').createRecord('GHNotification', {
    "id": window.count, 
    "name":"Nathaniel Watts", 
    "message":"BOOMSHAKALAKA", 
    "email":"simon.taranto@gmail.com",
    "creationDate": Date.now() });
  console.log(window.count);
  window.count++;
};

App = Ember.Application.create({
  PUSHER_OPTS: { key: '3568c8046d9171a5f8ee', connection: {} }
});

App.Router.map(function() {
  // put your routes here
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
  project_id: function() {
    var pieces = window.location.pathname.split('/'),
        project_id = pieces[ pieces.length -1 ];
    return project_id;
  },
  init: function() {
    var pieces = window.location.pathname.split('/'),
        project_id = pieces[ pieces.length -1 ];
    this.PUSHER_SUBSCRIPTIONS['project_' + project_id] = ['github_notification'];
    this._super();
  },
  PUSHER_SUBSCRIPTIONS: {
    activity_channel: ['new_idea'],
    github_notification: ['new_notification']
  },
  createNotification: function(data) {
    console.log(data);
    data.tinyHash = data.tiny_hash;
    data.creationDate = data.creation_date;
    this.store.createRecord('GHNotification', data);
  },
  sortedNotifications: Ember.computed.sort('notifications', function(a, b) {
    var firstId = parseInt(a.id, 10),
        secondId = parseInt(b.id, 10);
    if (firstId > secondId) {
      return -1;
    }
    if (firstId < secondId) {
      return 1;
    }
    return 0;
  }),
  actions: {
    githubNotification: function(data) { this.createNotification(data.data.commit); },
    newIdea: function(data) { this.createNotification(data); }
  },

  notificationsUpdated: function() {
    Ember.run.next(this, function() {
      var flatNotifications = $('.notification.flat');
      var allNotifications = $('.notification');

      if (flatNotifications) {
        $.each(flatNotifications, function(index, notification) {
          setTimeout(function() {
            $(notification).addClass('full').removeClass('flat')
              .children('.hidden').delay(3000).addClass('visible').removeClass('hidden');
          }, 1);
        });
      }
      if (allNotifications.length > 9) {
//        allNotifications.last().fadeOut().remove();
      }
    });
  }.observes('this.notifications.@each')

});

App.UserAvatarComponent = Ember.Component.extend({
  avatarUrl: function() {
    var email = this.get('email'),
        hash = hex_md5(email),
        size = 65;
    return 'http://www.gravatar.com/avatar/' + hash + '?s=' + size;
  }.property('email')
});

App.ApplicationAdapter = DS.FixtureAdapter;

App.GHNotification = DS.Model.extend({
  name         : DS.attr(),
  email        : DS.attr(),
  message      : DS.attr(),
  creationDate : DS.attr(),
  tinyHash     : DS.attr(),
  elementId: function() {
    return "gh-" + this.get('id');
  }.property('id')
});

Ember.Handlebars.helper('format-time', function(date) {
  var time = parseInt(date, 10);
  return moment( time ).fromNow();
});

App.TimeStampComponent = Ember.Component.extend({

  startTimer: function () {

    var self = this, currentTime;
    this._timer = setInterval( function () {
      currentTime = parseInt(self.get( 'time' ), 10);
      self.set( 'time', ( currentTime - 60000  ) );
    }, 60000 );

  }.on( 'didInsertElement' ),

  killTimer: function () {
    clearInterval( this._timer );
  }.on( 'willDestroyElement' )

});

App.GHNotification.FIXTURES = [
  {
    id: 1,
    name: 'Tyler Long',
    email: 'tyler.stephen.long@gmail.com',
    message: 'first commit, yo!',
    tinyHash: '2bn8ic',
    creationDate: '1390377322000'
  },
  {
    id: 2,
    name: 'Nathaniel Watts',
    email: 'reg@nathanielwatts.com',
    message: 'gotta love the sunshine!',
    tinyHash: '2bn8ic',
    creationDate: '1390377708000'
  }
];

