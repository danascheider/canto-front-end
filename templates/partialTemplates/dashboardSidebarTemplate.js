var string = "<li class='sidebar-search'>\n  <div class='input-group custom-search-form'>\n  <input type='text' class='form-control' placeholder='Search...'>\n    <span class='input-group-btn'>\n      <button class='btn btn-default' type='button'>\n        <i class='fa fa-search'></i>\n      </button>\n    </span>\n  </input>\n  </div> <!-- end input-group -->\n</li>\n<li>\n  <a href='#dashboard' class='dashboard-link sidebar-link internal-link' data-target='dashboard' onclick='return false'><i class='fa fa-dashboard fa-fw'></i> Dashboard</a>\n</li>\n<li>\n  <a href='#tasks' class='task-page-link sidebar-link internal-link' data-target='tasks' onclick='return false'><i class='fa fa-tasks fa-fw'></i> Tasks</a>\n</li>\n<li>\n  <a href='#local' class='local-page-link sidebar-link internal-link' data-target='local' onclick='return false'><i class='fa fa-map-marker fa-fw' onclick='return false'></i> Local</a>\n</li>\n<li>\n  <a href='tables.html' class='internal-link' onclick='return false'><i class='fa fa-table fa-fw'></i> Tables</a>\n</li>\n<li>\n  <a href='forms.html' class='internal-link' onclick='return false'><i class='fa fa-edit fa-fw'></i> Forms</a>\n</li>\n<li>\n  <a href='#' class='sidebar-link internal-link' onclick='return false'><i class='fa fa-wrench fa-fw'></i> UI Elements<span class='fa arrow'></span></a>\n  <ul class='nav nav-second-level collapse in' style='display: none;'>\n    <li>\n      <a href='panels-wells.html' class='internal-link' onclick='return false'>Panels and Wells</a>\n    </li>\n    <li>\n      <a href='buttons.html' class='internal-link' onclick='return false'>Buttons</a>\n    </li>\n    <li>\n      <a href='notifications.html' class='internal-link' onclick='return false'>Notifications</a>\n    </li>\n    <li>\n      <a href='typography.html' class='internal-link' onclick='return false'>Typography</a>\n    </li>\n    <li>\n      <a href='grid.html' class='internal-link' onclick='return false'>Grid</a>\n    </li>\n  </ul> <!-- end nav-second-level -->\n</li>\n<li>\n  <a href='#' class='sidebar-link internal-link' onclick='return false'><i class='fa fa-sitemap fa-fw'></i> Multi-Level Dropdown<span class='fa arrow'></span></a>\n  <ul class='nav nav-second-level collapse in' style='display: none;'>\n    <li>\n      <a href='#' class='internal-link' onclick='return false'>Second Level Item</a>\n    </li>\n    <li>\n      <a href='#' class='internal-link' onclick='return false'>Second Level Item</a>\n    </li>\n    <li>\n      <a href='#' class='internal-link' onclick='return false'>Third Level <span class='fa arrow'></span></a>\n        <ul class='nav nav-third-level collapse in' style='display: none;'>\n          <li>\n            <a href='#' class='internal-link' onclick='return false'>Third Level Item</a>\n          </li>\n          <li>\n            <a href='#' class='internal-link' onclick='return false'>Third Level Item</a>\n          </li>\n          <li>\n            <a href='#' class='internal-link' onclick='return false'>Third Level Item</a>\n          </li>\n          <li>\n            <a href='#' class='internal-link' onclick='return false'>Third Level Item</a>\n          </li>\n        </ul> <!-- end nav-third-level -->\n      </li>\n    </ul> <!-- end nav-second-level -->\n</li>\n<li>\n  <a href='#' class='sidebar-link internal-link' onclick='return false'><i class='fa fa-files-o fa-fw'></i> Sample Pages<span class='fa arrow'></span></a>\n  <ul class='nav nav-second-level collapse in' style='display: none;'>\n    <li>\n      <a href='blank.html' class='internal-link' onclick='return false'>Blank Page</a>\n    </li>\n    <li>\n      <a href='#login' class='internal-link' data-target='login' onclick='return false'>Login Page</a>\n    </li>\n  </ul> <!-- end nav-second-level -->\n</li>";

module.exports = string;
