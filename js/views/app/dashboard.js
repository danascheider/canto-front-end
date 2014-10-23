define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/app/dashboard.html',
  'css!stylesheets/bootstrap.css',
  'css!stylesheets/sb-admin.css',
  'css!stylesheets/canto.css',
  'css!stylesheets/font-awesome.css'
  ], function($, _, Backbone, DashboardTemplate, BootstrapStyles, ThemeStyles, CantoStyles, FAStyles) {
  
  var DashboardView = Backbone.View.extend({
    el     : $('body'),

    events : {
      'click body'                : 'hideDropdownMenus',
      'click navbar-top-links a'  : 'toggleDropdownMenu',
      'click a.dropdown-toggle'   : 'blurParentLi'
    },

    blurParentLi: function() {
      if($(this).parent('li').is(':visible')) {
        $(this).parent('li').blur();
      }
    },

    initialize: function(router) {
      this.router = router;
    },

    render: function() {
      this.$el.html(_.template(DashboardTemplate));
      return this;
    },

    hideDropdownMenus: function(e) {
      var menu = $('.dropdown-menu');
      if(!menu.is(e.target) && menu.has(e.target).length === 0) {
        menu.hide();
      }
    },

    toggleDropdownMenu: function(e) {
      $.each($(this).parent('li').siblings(), function() {
        if ($(this).find('.dropdown-menu').is(':visible')) {
          $(this).find('.dropdown-menu').hide();
        }
      });
      $(this).parent('li').find('.dropdown-menu').toggle();
    }
  });

  return DashboardView;
});