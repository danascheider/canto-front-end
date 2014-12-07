define([
  'jquery',
  'underscore',
  'backbone',
  'cookie',
  'jquery-ui',
  'api',
  'utils',
  'models/task',
  'views/tasks/create-form',
  'views/tasks/list-entry',
  'text!templates/tasks/model.html'
], function(
  $, 
  _, 
  Backbone, 
  Cookie,
  JQueryUI,
  API,
  Utils,
  TaskModel,
  CreateFormView,
  ListEntryView,
  ModelTemplate) {
  
  var TaskCollectionView = Backbone.View.extend({

    // Templates //
    template           : _.template("<ul class='task-list></ul>"),
    modelTemplate      : _.template(ModelTemplate),

    tagName            : 'ul',
    className          : 'task-list',

    // Core View Functions //

    initialize: function() {
      this.render();
      this.listenTo(this.collection, 'remove', this.render);
      this.listenTo(this.collection, 'add', this.render);
    },

    render: function() {
      var that = this;
      this.$el.html(this.template());

      this.collection.each(function(task) {
        var view = new ListEntryView({modelTemplate: that.modelTemplate, model: task});
        that.$el.append(view.$el);
      });

      return this;
    }
  });

  return TaskCollectionView;
});