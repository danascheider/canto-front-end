define([
  'jquery',
  'underscore',
  'backbone',
  'models/task',
  'api',
  'utils',
  'cookie'
], function($, _, Backbone, TaskModel, API, Utils) {
  
  var TaskCollection = Backbone.Collection.extend({
    model      : TaskModel,
    comparator : 'position',
    url        : function() {
      return API.tasks.collection($.cookie('userID'));
    },

    promiseCreate     : function(attributes) {
      var that = this;

      return new Promise(function(resolve, reject) {
        that.create(attributes, {
          url        : that.url(),
          beforeSend : Utils.authHeader,
          success    : function(model) {
            resolve(model);
          },
          error      : function(model, response) {
            reject(response);
          }
        });
      });
    }
  });

  return TaskCollection;
});