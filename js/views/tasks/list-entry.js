define([
  'jquery',
  'underscore',
  'backbone',
  'jquery-ui',
  'api',
  'utils',
  'views/tasks/update-form',
  'views/tasks/model',
  'text!templates/tasks/model.html',
  'text!templates/tasks/list-entry.html',
], function(
  $, 
  _, 
  Backbone, 
  JQueryUI,
  API, 
  Utils, 
  UpdateFormView, 
  ModelView, 
  TaskModelTemplate, 
  ListEntryTemplate
) {

  var ListEntryView = Backbone.View.extend({
    tagName   : 'li',
    id        : function() { return 'task-' + this.model.get('id'); },
    className : 'ui-widget-content ui-draggable ui-draggable-handle task-list-item',
    template  : _.template(ListEntryTemplate),

    events    : {
      'click .fa-pencil'   : 'showEditForm',
      'click .fa-square-o' : 'markComplete',
      'click .fa-times'    : 'deleteTask',
      'click a.task-title' : 'toggleTaskDetails',
      'click button:reset' : 'hideEditForm',
      'mouseenter'         : 'showEditIcons',
      'mouseleave'         : 'hideEditIcons'
    },

    modelTemplate: _.template(TaskModelTemplate),

    crossOff          : function() {
      // In this context, `this` apparently refers to the model
      var task = this;

      if(this.get('status') === 'Complete') {
        var collection = task.collection;
        var id = '#task-' + this.get('id');

        $(id).find('i.fa-square-o').removeClass('fa-square-o').addClass('fa-check-square-o');
        $(id).find('.task-title').css('text-decoration', 'line-through');

        var removeFromCollection = function() {
          collection.remove(task);
        }

        window.setTimeout(removeFromCollection, 750);        
      }
    },

    deleteTask        : function() {
      var model = this.model;

      model.destroy({
        url: API.tasks.single(model.get('id')),
        type: 'DELETE',
        beforeSend: Utils.authHeader
      });
    },

    hideEditForm      : function() {
      var that = this;

      this.$editForm.$el.find('form').slideUp();

      window.setTimeout(function() {
        that.$modelView.render();
        that.$el.find('span.edit-task').show();
        that.$el.find('span.edit-task').css('visibility', 'hidden');
      }, 500);
    },

    hideEditIcons     : function() {
      this.$el.find('span.edit-task').css('visibility', 'hidden');
    },

    markComplete      : function(e) {
      var that    = this;
      var li      = this.$el
      var target  = e.target;

      this.model.save({status: 'Complete'}, {
        dataType    : 'html',
        type        : 'PUT',
        url         : API.tasks.single(this.model.get('id')),
        beforeSend  : Utils.authHeader
      });
    },

    showEditForm      : function() {
      this.$el.find('span.edit-task').fadeOut(150);
      this.$el.find('table.task-model').fadeOut(150);

      var that = this;

      function renderForm() {
        that.$editForm.render();
        that.$editForm.$el.find('form').slideDown(50);
      }

      window.setTimeout(renderForm, 150);
    },

    showEditIcons     : function() {
      if(!this.$el.find('form').is(':visible')) {
        this.$el.find('span.edit-task').css('visibility', 'visible');
      }
    },

    toggleTaskDetails : function(e) {
      e.preventDefault();
      var target = $(e.target);
      var table  = target.siblings('table');
      $(table).toggle();
    },

    // Standard View Functions // 

    initialize: function() {
      this.render();
      this.model.on('change:status', this.crossOff);
      this.listenTo(this.$editForm, 'done', this.render);
    },

    render: function() {
      this.$el.html(this.template);

      var td = this.$el.find('td.task-listing');
      this.$editForm = new UpdateFormView({model: this.model, el: td});
      this.$modelView = new ModelView({model: this.model, el: td});

      this.$modelView.render({el: this.$el.find('td.task-listing')});

      var that = this;
      this.$el.draggable({
        containment: 'parent',
        connectToSortable: '.task-list',

        // Start and stop functions should vary depending on what view
        // they are rendered in. 

        stop: function(e, ui) {
          // This only works in the Kanban view
          // This needs to do a different thing on the dashboard view
          var column = $(this).closest('.kanban-col').find('.panel-heading')[0];

          if (!column) {
            // Check the order of the list
            var sibs = that.$el.prevUntil('li#quick-add-form').get().reverse();
            var len = sibs.length;
            var i = 1

            $.each(sibs, function(index) {
              var modelID = $(sibs[index]).attr('id').match(/(\d+)/)[0];
              that.model.collection.get(modelID).save({position: i},{
                url        : API.tasks.single(modelID),
                beforeSend : Utils.authHeader
              });
              i++
            });

            that.model.set('position', sibs.length + 1);

          } else if (column.innerText === 'Backlog') {
            that.model.set('backlog', true);
          } else {
            that.model.set('status', column.innerText);
          }

          that.model.save({}, {
            dataType: 'html',
            url : API.tasks.single(that.model.get('id')),
            beforeSend: Utils.authHeader
          });
        }
      });

      // FIX: I don't know what this actually does. It may not be
      //      necessary.
      this.$el.disableSelection();

      return this;
    }
  });

  return ListEntryView;
});