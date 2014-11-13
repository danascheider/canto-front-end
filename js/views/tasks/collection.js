define([
  'jquery',
  'underscore',
  'backbone',
  'cookie',
  'api',
  'form-utils',
  'models/task',
  'views/tasks/create-form',
  'views/tasks/list-entry',
  'text!templates/tasks/model.html',
  'text!templates/tasks/list-entry.html',
  'text!templates/tasks/collection.html',
], function(
  $, 
  _, 
  Backbone, 
  Cookie,
  API,
  FormUtils,
  TaskModel,
  CreateFormView,
  ListEntryView,
  ModelTemplate, 
  ListEntryTemplate, 
  CollectionTemplate
) {
  
  var TaskCollectionView = Backbone.View.extend({

    // Templates //

    template           : _.template(CollectionTemplate),
    modelTemplate      : _.template(ModelTemplate),
    listItemTemplate   : _.template(ListEntryTemplate),

    // Events //

    events : {
      'click th.task-title' : 'toggleTaskDetails',
      'click a.create-task' : 'toggleCreateForm',
      'submit form'         : 'createTask'
    },

    // Event Handlers //
    createTask: function(e) {
      e.preventDefault();

      var that = this;
      var form = $(e.target);
      var attrs = FormUtils.getAttributes(form);

      var newTask = new TaskModel(attrs);

      newTask.save(attrs, {
        url        : API.tasks.collection($.cookie('userID')),
        beforeSend : function(xhr) {
          xhr.setRequestHeader('Authorization', 'Basic ' + $.cookie('auth'));
        },
        success    : function(model, response, xhr) {
          that.collection.add(model);
          form.clear;
        },
        error      : function(model, response, xhr) {
          console.log('Error: ', response);
        }
      });    
    },

    toggleCreateForm  : function(e) {
      e.preventDefault();
      var form = this.$el.find('form.task-form');
      $(form).slideToggle();
    },

    toggleTaskDetails : function(e) {
      e.preventDefault();
      var target = e.target;
      var siblings = $(target).closest('tr').siblings();
      $(siblings).toggle();
    },
    
    // Core View Functions //

    initialize: function() {
      this.render();
      this.listenTo(this.collection, 'remove', this.render);
      this.listenTo(this.collection, 'add', this.render);
    },

    render: function() {
      this.$el.html(this.template({ 
                                    collection: this.collection,
                                    listItemTemplate: this.listItemTemplate,
                                    modelTemplate: this.modelTemplate
                                  }));

      var that = this;

      this.collection.each(function(task) {
        var view = new ListEntryView({modelTemplate: that.modelTemplate, model: task});
        var list = that.$el.find('ul');
        list.append(view.el);
      });

      return this;
    }
  });

  return TaskCollectionView;
});