/* istanbul ignore next */
var string = "<div class='col-lg-3 col-md-6'>\n  <div class='panel panel-primary dash-widget internal-link' data-target='tasks' data-name='tasks'> \n    <div class='panel-heading'>\n      <div class='row'>\n\n        <!-- This is the div with the widget's icon -->\n        <div class='col-xs-3'>\n          <i class='fa fa-tasks fa-4x'></i>\n        </div>\n\n        <!-- This is the div with the number and kind of items -->\n        <div class='col-xs-9 text-right'>\n          <div class='huge'><%= taskCollection.length %></div>\n          <div>Incomplete Tasks!</div>\n        </div> <!-- end col-xs-9 text-right' -->\n\n      </div>\n    </div>\n    <a href='#'>\n      <div class='panel-body'>\n        <span class='pull-left'>View Details</span>\n        <span class='pull-right'>\n          <i class='fa fa-arrow-circle-right'></i>\n        </span>\n      </div>\n    </a>\n  </div>\n</div> <!-- end col-lg-3 col-md-6 (first widget) -->\n<div class='col-lg-3 col-md-6'>\n  <div class='panel panel-green dash-widget' data-name='deadlines'>\n    <div class='panel-heading'>\n      <div class='row'>\n\n        <!-- This is the div with the widget's icon -->\n        <div class='col-xs-3'>\n          <i class='fa fa-clock-o fa-4x'></i>\n        </div>\n\n        <!-- This is the div with the number and kind of items -->\n        <div class='col-xs-9 text-right'>\n          <div class='huge'><%= deadlineCount %></div>\n          <div>Upcoming Deadlines!</div>\n        </div> <!-- end col-xs-9 text-right' -->\n\n      </div>\n    </div>\n    <a href='#'>\n      <div class='panel-body'>\n        <span class='pull-left'>View Details</span>\n        <span class='pull-right'>\n          <i class='fa fa-arrow-circle-right'></i>\n        </span>\n      </div>\n    </a>\n  </div>\n</div> <!-- end col-lg-3 col-md-6 (second widget) -->\n<div class='col-lg-3 col-md-6'>\n  <div class='panel panel-yellow dash-widget' data-name='appointments'>\n    <div class='panel-heading'>\n      <div class='row'>\n\n        <!-- This is the div with the widget's icon -->\n        <div class='col-xs-3'>\n          <i class='fa fa-calendar-o fa-4x'></i>\n        </div>\n\n        <!-- This is the div with the number and kind of items -->\n        <div class='col-xs-9 text-right'>\n          <div class='huge'><%= appointmentCount %></div>\n          <div>New Appointments!</div>\n        </div> <!-- end col-xs-9 text-right' -->\n\n      </div>\n    </div>\n    <a href='#'>\n      <div class='panel-body'>\n        <span class='pull-left'>View Details</span>\n        <span class='pull-right'>\n          <i class='fa fa-arrow-circle-right'></i>\n        </span>\n      </div>\n    </a>\n  </div>\n</div> <!-- end col-lg-3 col-md-6 (third widget) -->\n<div class='col-lg-3 col-md-6'>\n  <div class='panel panel-red dash-widget' data-name='recommendations'>\n    <div class='panel-heading'>\n      <div class='row'>\n\n        <!-- This is the div with the widget's icon -->\n        <div class='col-xs-3'>\n          <i class='fa fa-check fa-4x'></i>\n        </div>\n\n        <!-- This is the div with the number and kind of items -->\n        <div class='col-xs-9 text-right'>\n          <div class='huge'><%= recommendationCount %></div>\n          <div>Recommendations!</div>\n        </div> <!-- end col-xs-9 text-right' -->\n\n      </div>\n    </div>\n    <a href='#'>\n      <div class='panel-body'>\n        <span class='pull-left'>View Details</span>\n        <span class='pull-right'>\n          <i class='fa fa-arrow-circle-right'></i>\n        </span>\n      </div>\n    </a>\n  </div>\n</div> <!-- end col-lg-3 col-md-6 (fourth widget) -->";

module.exports = string;
