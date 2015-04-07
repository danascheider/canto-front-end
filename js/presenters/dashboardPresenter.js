/* Core Requires
/*****************************************************************************************/

Canto       = Canto || require('../dependencies.js');
Canto.Model = Canto.Model || require('../models/cantoModel.js');

/* Module-Specific Requires
/*****************************************************************************************/

var DashboardView  = require('../views/appViews/dashboardView.js'),
    TaskCollection = require('../collections/taskCollection.js');

/* ***************************************************************************************\
 * DASHBOARD PRESENTER                                                                   *
\*****************************************************************************************/

var DashboardPresenter = Canto.Model.extend({

  /* Canto Model Properties
  /***************************************************************************************/

  klass      : 'DashboardPresenter',
  types      : function() {
    return Canto.Model.prototype.types().concat(['Presenter', 'DashboardPresenter']);
  },

  /* Event Callbacks
  /***************************************************************************************/

  getHome    : function() {
    this.showDash();
    this.dashboardView.showHomeView();
    this.current = 'home';
  },

  getTask    : function() {
    this.showDash();
    this.dashboardView.showTaskView();
    this.current = 'task';
  },

  redirect   : function(opts) {
    this.trigger('redirect', opts);
  },

  /* Special Functions
  /***************************************************************************************/

  removeAll  : function() {
    this.dashboardView.remove();
  },

  setUser    : function(user) {
    this.user = user;
    this.user.tasks = new TaskCollection();
    this.user.protectedFetch();
    this.user.tasks.fetch();
    this.dashboardView.setUser(user);
  },

  showDash   : function() {
    if(!this.dashboardView.$el.is(':visible')) {
      this.dashboardView.render();
      $('body').html(this.dashboardView.$el);
    }
  },

  /* Core Model Functions
  /***************************************************************************************/

  initialize : function(opts) {
    opts = opts || {};
    this.dashboardView = new DashboardView();
    
    if(!!opts.user) { this.setUser(opts.user) }

    this.listenTo(this.dashboardView, 'redirect', this.redirect);
  }
});

module.exports = DashboardPresenter;