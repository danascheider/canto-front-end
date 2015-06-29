Tessitura.DashboardTaskView = Tessitura.View.extend({

  /* Backbone View Properties
  /**************************************************************************/

  template    : JST['partials/dashTasks'],
  id          : 'page-wrapper',

  /* Tessitura View Properties
  /**************************************************************************/

  klass       : 'DashboardTaskView',
  family      : 'Tessitura.View',
  superFamily : 'Backbone.View',
  types       : function() {
    return Tessitura.View.prototype.types().concat(['DashboardTaskView']);
  },

  /* Special Functions
  /**************************************************************************/

  addToBacklog      : function(task) {
    this.backlogColumnView.collection.add([task]);
  },

  changeStatus      : function(task) {
    var newCollection = this.findNewCollection(task) || new Tessitura.TaskCollection();
    newCollection.add([task]);
  },

  findNewCollection : function(task) {
    var that   = this,
        status = task.get('status');

    if(task.get('backlog') === true) { 
      return this.backlogColumnView.collection; 
    }

    _.each([that.newColumnView, that.inProgressColumnView, that.blockingColumnView], function(col) {
      if(col.data.headline === status) {
        return col.collection;
      }
    });
  },

  removeFromBacklog : function(task) {
    var that = this;

    if(this.backlogColumnView.collection.models.indexOf(task) > -1) {
      this.backlogColumnView.collection.remove(task);
      var newCollection = this.findNewCollection(task);
      newCollection.add([task]);
    }
  },

  setUser : function(user) {
    this.user = user;
    this.user.tasks = this.user.tasks || new Tessitura.TaskCollection();
  },

  /* Core View Functions
  /**************************************************************************/

  initialize : function(opts) {
    opts = opts || {};

    this.childViews = [];
    if(!!opts.user) { this.setUser(opts.user); }
  },

  remove     : function() {
    if(this.childViews && this.childViews.length) { 
      _.each(this.childViews, function(view) { view.remove(); });
    }

    Tessitura.View.prototype.remove.call(this);
  },

  render     : function() {
    var that = this;

    this.user.tasks.fetch({
      success: function(collection) {
        that.backlogColumnView = new Tessitura.KanbanColumnView({
          el         : that.$('#backlog-tasks'),
          collection : that.user.tasks,
          color      : 'red',
          icon       : 'fa-exclamation-circle',
          headline   : 'Backlog'
        });

        that.newColumnView = new Tessitura.KanbanColumnView({
          el         : that.$('#new-tasks'),
          collection : that.user.tasks,
          color      : 'blue',
          icon       : 'fa-certificate',
          headline   : 'New'
        });

        that.inProgressColumnView = new Tessitura.KanbanColumnView({
          el         : that.$('#in-progress-tasks'),
          collection : that.user.tasks,
          color      : 'green',
          icon       : 'fa-road',
          headline   : 'In Progress'
        });

        that.blockingColumnView = new Tessitura.KanbanColumnView({
          el         : that.$('#blocking-tasks'),
          collection : that.user.tasks,
          color      : 'yellow',
          icon       : 'fa-minus-circle',
          headline   : 'Blocking'
        });

        that.childViews.push(that.backlogColumnView);
        that.childViews.push(that.newColumnView);
        that.childViews.push(that.inProgressColumnView);
        that.childViews.push(that.blockingColumnView);

        _.each(that.childViews, function(col) {
          col.render();
        });

        that.listenTo(that.backlogColumnView.collection, 'change:backlog', that.removeFromBacklog);
        that.listenTo(that.newColumnView.collection, 'change:status', that.changeStatus);
        that.listenTo(that.inProgressColumnView.collection, 'change:status', that.changeStatus);
        that.listenTo(that.blockingColumnView.collection, 'change:status', that.changeStatus);
        that.listenTo(that.newColumnView.collection, 'change:backlog', that.addToBacklog);
        that.listenTo(that.inProgressColumnView.collection, 'change:backlog', that.addToBacklog);
        that.listenTo(that.blockingColumnView.collection, 'change:backlog', that.addToBacklog);
      }
    });

    return Tessitura.View.prototype.render.call(this, this.template());
  }
});

module.exports = Tessitura.DashboardTaskView