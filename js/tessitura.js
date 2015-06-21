// Set globals
global.document  = window.document;
global.navigator = window.navigator;
global.$         = global.jQuery = require('jquery');
global._         = require('underscore');
global.Backbone  = require('backbone');
global.JST       = require('../templates/jst.js');

global.btoa      = function(string) {
  return new Buffer(string).toString('base64');
};

Backbone.$       = $;

// Basic requires that don't need references stored
require('jquery.cookie');
require('bootstrap-sass');
require('../vendor/jquery-ui-1.11.4.custom/jquery-ui.min.js');
require('../vendor/backbone-route-filter.js');
require('./views/backboneViewMods.js');
require('./collections/backboneCollectionMods.js');

global.Tessitura = {};

// Auxiliary Tessitura modules
Tessitura.API                    = require('./api.js');
Tessitura.Utils                  = require('./utils.js');

// Require models
Tessitura.Model                  = require('./models/tessituraModel.js');
Tessitura.ProtectedResourceModel = require('./models/protectedResourceModel.js');
Tessitura.TaskModel              = require('./models/taskModel.js');
Tessitura.UserModel              = require('./models/userModel.js');

// Require collections
Tessitura.ProtectedCollection   = require('./collections/protectedCollection.js');
Tessitura.TaskCollection        = require('./collections/taskCollection.js');

// Require top-level views
Tessitura.View                  = require('./views/appViews/tessituraView.js');
Tessitura.DashboardView         = require('./views/appViews/dashboardView.js');
Tessitura.HomepageView          = require('./views/appViews/homepageView.js');
Tessitura.DashWidgetView        = require('./views/appViews/dashWidgetView.js');


// Require model and collection views
Tessitura.QuickAddFormView      = require('./views/modelViews/taskViews/quickAddFormView.js');
Tessitura.TaskListItemView      = require('./views/modelViews/taskViews/taskListItemView.js');
Tessitura.UserModelView         = require('./views/modelViews/userViews/userModelView.js');
Tessitura.UserProfileView       = require('./views/modelViews/userViews/userProfileView.js');
Tessitura.TaskCollectionView    = require('./views/collectionViews/taskCollectionView.js');

// Require partial views
Tessitura.CalendarView           = require('./views/partialViews/calendarView.js');
Tessitura.DashboardTopNavView    = require('./views/partialViews/dashboardTopNavView.js');
Tessitura.DashboardHomeView      = require('./views/partialViews/dashboardHomeView.js');
Tessitura.DashboardProfileView   = require('./views/partialViews/dashboardProfileView.js');
Tessitura.DashboardSidebarView   = require('./views/partialViews/dashboardSidebarView.js');
Tessitura.DashboardTopWidgetView = require('./views/partialViews/dashboardTopWidgetView.js');
Tessitura.DashboardTaskView      = require('./views/partialViews/dashboardTaskView.js');
Tessitura.KanbanColumnView       = require('./views/partialViews/kanbanColumnView.js');
Tessitura.LoginFormView          = require('./views/partialViews/loginFormView.js');
Tessitura.RegistrationFormView   = require('./views/partialViews/registrationFormView.js');
Tessitura.TaskPanelView          = require('./views/partialViews/taskPanelView.js');

// Require presenters
Tessitura.AppPresenter           = require('./presenters/appPresenter.js');
Tessitura.DashboardPresenter     = require('./presenters/dashboardPresenter.js');

// Require router
Tessitura.Router                 = Tessitura.Router || require('./routers/tessituraRouter.js');