var Fixtures = require('../../../spec/support/fixtures/fixtures.js');

var SpecWrapper = Backbone.View.extend({
  el         : 'body',
  template   : JST['spec/taskPanel'],

  events     : {
    'click a' : 'callMethod'
  },

  callMethod : function(e) {
    e.preventDefault();

    try {
      this.view[$(e.target).attr('data-method')]();
    } catch(err) {
      this[$(e.target).attr('data-method')]();
    }

    if($(e.target).attr('data-method') === 'render') {
      this.$('#view').html(this.view.$el);
    }
  },

  displayIcon: function() {
    if(!this.$('#task-panel .show-widget,#task-panel .hide-widget').is(':visible')) { this.$('#task-panel .show-widget, #task-panel .hide-widget').fadeIn(100); }
  },

  displayPanelBody: function() {
    if(!this.$('#task-panel .panel-body').is(':visible')) { this.$('.panel-body').slideDown(); }
  },

  hideIcon: function() {
    if(this.$('#task-panel .show-widget,#task-panel .hide-widget').is(':visible')) { this.$('#task-panel .show-widget, #task-panel .hide-widget').fadeOut(100); }
  },

  hidePanelBody: function() {
    if(this.$('#task-panel .panel-body').is(':visible')) { this.$('.panel-body').slideUp(); }
  },

  initialize : function() {
    this.view = new Canto.TaskPanelView({collection: Fixtures.collection});
    this.render();
  },

  render   : function() {
    this.$el.html(this.template());
    this.$el.addClass('test').attr('id', 'dashboard-wrapper');
    this.delegateEvents();
    this.view.render();
    this.$('#view').html(this.view.$el);
    this.view.delegateEvents();

    return this;
  }
});

module.exports = SpecWrapper;