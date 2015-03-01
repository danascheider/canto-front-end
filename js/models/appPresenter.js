define([
  'jquery',
  'underscore',
  'backbone',
  'models/user',
  'views/main/homepage',
], function($, _, Backbone, UserModel, HomepageView) {

  var AppPresenter = Backbone.Model.extend({
    initialize : function() {
      this.homepageView  = new HomepageView();
      this.listenTo(this.homepageView, 'loginSuccess', this.emitLogin);
    },

    emitLogin   : function() {
      this.trigger('loginSuccess');
    },

    getHomepage : function(element) {
      this.homepageView = this.homepageView || new HomepageView();
      this.homepageView.render();
      $(element).prepend(this.homepageView.el);
    },

    removeAll    : function() {
      if (this.hasOwnProperty('homepageView')) { 
        this.homepageView.remove(); 
      }
    }
  });

  return AppPresenter; 
});