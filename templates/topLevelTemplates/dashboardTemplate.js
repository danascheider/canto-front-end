var string = "<nav class='navbar navbar-default navbar-fixed-top' role='navigation' style='margin-bottom: 0'>\n  <div class='navbar-header'>\n    <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='.sidebar-collapse'>\n      <span class='sr-only'>Toggle navigation</span>\n      <span class='icon-bar'></span>\n      <span class='icon-bar'></span>\n      <span class='icon-bar'></span>\n    </button>\n    <a class='navbar-brand' href='#' onclick='return false'><i class='fa fa-bars fa-fw'></i>  Tessitura Dashboard</a>\n  </div> <!-- end navbar-header -->\n\n  <ul class='nav navbar-top-links navbar-right'>\n    <li class='dropdown' title='Messages'>\n      <a class='dropdown-toggle' data-toggle='dropdown' href='#' onclick='return false'>\n        <i class='fa fa-envelope fa-fw'></i>  <i class='fa fa-caret-down'></i>\n      </a>\n      <ul class='dropdown-menu dropdown-messages'>\n        <li>\n          <a class='internal-link' href='#'>\n            <div>\n              <strong><%- first_name %> <%- last_name %></strong>\n              <span class='pull-right text-muted'>\n                <em>Yesterday</em>\n              </span>\n            </div>\n            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>\n          </a>\n        </li>\n        <li class='divider'></li>\n        <li>\n          <a class='internal-link' href='#'>\n            <div>\n              <strong><%- first_name %> <%- last_name %></strong>\n              <span class='pull-right text-muted'>\n                <em>Yesterday</em>\n              </span>\n            </div>\n            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>\n          </a>\n        </li>\n        <li class='divider'></li>\n        <li>\n          <a class='internal-link' href='#'>\n            <div>\n              <strong><%- first_name %> <%- last_name %></strong>\n              <span class='pull-right text-muted'>\n                <em>Yesterday</em>\n              </span>\n            </div>\n            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>\n          </a>\n        </li>\n        <li class='divider'></li>\n        <li>\n          <a class='text-center' href='#'>\n            <strong>Read All Messages</strong>\n            <i class='fa fa-angle-right'></i>\n          </a>\n        </li>\n      </ul> <!-- end dropdown-messages -->\n    </li> <!-- end messages dropdown -->\n\n    <li class='dropdown' title='Tasks'>\n      <a class='dropdown-toggle' data-toggle='dropdown' href='#' onclick='return false'>\n        <i class='fa fa-tasks fa-fw'></i>  <i class='fa fa-caret-down'></i>\n      </a>\n      <ul class='dropdown-menu dropdown-tasks'>\n        <li>\n          <a href='#'>\n            <div>\n              <p>\n                <strong>Task 1</strong>\n                <span class='pull-right text-muted'>40% Complete</span>\n              </p>\n              <div class='progress progress-striped active'>\n                  <div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style='width: 40%'>\n                    <span class='sr-only'>40% Complete (success)</span>\n                </div>\n              </div>\n            </div>\n          </a>\n        </li>\n        <li class='divider'></li>\n        <li>\n          <a href='#'>\n            <div>\n              <p>\n                <strong>Task 2</strong>\n                <span class='pull-right text-muted'>20% Complete</span>\n              </p>\n              <div class='progress progress-striped active'>\n                <div class='progress-bar progress-bar-info' role='progressbar' aria-valuenow='20' aria-valuemin='0' aria-valuemax='100' style='width: 20%'>\n                  <span class='sr-only'>20% Complete</span>\n                </div>\n              </div>\n            </div>\n          </a>\n        </li>\n        <li class='divider'></li>\n        <li>\n          <a href='#'>\n            <div>\n              <p>\n                <strong>Task 3</strong>\n                <span class='pull-right text-muted'>60% Complete</span>\n              </p>\n              <div class='progress progress-striped active'>\n                <div class='progress-bar progress-bar-warning' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width: 60%'>\n                  <span class='sr-only'>60% Complete (warning)</span>\n                </div>\n              </div>\n            </div>\n          </a>\n        </li>\n        <li class='divider'></li>\n        <li>\n          <a href='#'>\n            <div>\n              <p>\n                <strong>Task 4</strong>\n                <span class='pull-right text-muted'>80% Complete</span>\n              </p>\n              <div class='progress progress-striped active'>\n                <div class='progress-bar progress-bar-danger' role='progressbar' aria-valuenow='80' aria-valuemin='0' aria-valuemax='100' style='width: 80%'>\n                  <span class='sr-only'>80% Complete (danger)</span>\n                </div>\n              </div>\n            </div>\n          </a>\n        </li>\n        <li class='divider'></li>\n        <li>\n          <a class='text-center' href='#'>\n            <strong>See All Tasks</strong>\n            <i class='fa fa-angle-right'></i>\n          </a>\n        </li>\n      </ul> <!-- end dropdown-tasks -->\n    </li> <!-- end tasks dropdown -->\n\n    <li class='dropdown' title='Alerts'>\n      <a class='dropdown-toggle' data-toggle='dropdown' href='#' onclick='return false'>\n        <i class='fa fa-bell fa-fw'></i>  <i class='fa fa-caret-down'></i>\n      </a>\n      <ul class='dropdown-menu dropdown-alerts'>\n        <li>\n          <a href='#'>\n            <div>\n              <i class='fa fa-comment fa-fw'></i> New Comment\n              <span class='pull-right text-muted small'>4 minutes ago</span>\n            </div>\n          </a>\n        </li>\n        <li class='divider'></li>\n        <li>\n          <a href='#'>\n            <div>\n              <i class='fa fa-twitter fa-fw'></i> 3 New Followers\n              <span class='pull-right text-muted small'>12 minutes ago</span>\n            </div>\n          </a>\n        </li>\n        <li class='divider'></li>\n        <li>\n          <a href='#'>\n            <div>\n              <i class='fa fa-envelope fa-fw'></i> Message Sent\n              <span class='pull-right text-muted small'>4 minutes ago</span>\n            </div>\n          </a>\n        </li>\n        <li class='divider'></li>\n        <li>\n          <a href='#'>\n            <div>\n              <i class='fa fa-tasks fa-fw'></i> New Task\n              <span class='pull-right text-muted small'>4 minutes ago</span>\n            </div>\n          </a>\n        </li>\n        <li class='divider'></li>\n        <li>\n          <a href='#'>\n            <div>\n              <i class='fa fa-upload fa-fw'></i> Server Rebooted\n              <span class='pull-right text-muted small'>4 minutes ago</span>\n            </div>\n          </a>\n        </li>\n        <li class='divider'></li>\n        <li>\n          <a class='text-center' href='#'>\n            <strong>See All Alerts</strong>\n            <i class='fa fa-angle-right'></i>\n          </a>\n        </li>\n      </ul> <!-- end dropdown-alerts -->\n    </li> <!-- end alerts dropdown -->\n\n    <li class='dropdown' title='User'>\n      <a class='dropdown-toggle' data-toggle='dropdown' href='#' onclick='return false'>\n        <i class='fa fa-user fa-fw'></i>  <%- first_name %> <%- last_name %>  <i class='fa fa-caret-down'></i>\n      </a>\n      <ul class='dropdown-menu dropdown-user'>\n        <li><a class='internal-link' href='/#profile' data-target='profile' onclick='return false'><i class='fa fa-user fa-fw'></i> User Profile</a></li>\n        <li class='divider'></li>\n        <li><a class='internal-link' href='/#dashboard' data-target='dashboard' onclick='return false'><i class='fa fa-dashboard fa-fw'></i>  Dashboard</a></li>\n        <li class='divider'></li>\n        <li><a class='internal-link' href='#'><i class='fa fa-gear fa-fw'></i> Settings</a></li>\n        <li class='divider'></li>\n        <li><a class='internal-link' href='/#logout' data-target='logout'><i class='fa fa-sign-out fa-fw'></i> Logout</a></li>\n      </ul> <!-- end dropdown-user -->\n    </li> <!-- end profile dropdown -->\n  </ul> <!-- end navbar-top-links -->\n\n  <div class='navbar-default navbar-static-side' role='navigation'>\n    <div class='sidebar-collapse'></div>\n  </div> <!-- end navbar-static-side -->\n</nav>";

module.exports = string;
