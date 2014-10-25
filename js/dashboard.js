/* This is a temporary thing that fetches all the tasks from the server
   when the dashboard is loaded. Eventually, it will dynamically render
   the dashboard views so users can see their data when they log in. 
*/

var taskListingTemplate = _.template("<table class='task-listing'>
    <tr>
      <td colspan='2'>
        <a href='' class='task-title'><%= title %></a>
      </td>
    </tr>
    <tr>
      <td><strong>Deadline:</strong></td>
      <td><%= deadline %></td>
    </tr>
    <tr>
      <td><strong>Priority:</strong></td>
      <td><%= priority %></td>
    </tr>
    <tr>
      <td><strong>Status:</strong></td>
      <td><%= status %></td>
    </tr>
    <tr>
      <td style='vertical-align: text-top'><strong>Notes:</strong></td>
      <td><%= description %></td>
    </tr>
  </table>
  ");

var taskWidgetItem = _.template("
  <li class='task'>
    <table class='table'>
      <tr>
        <td style='vertical-align: text-top'><i class='fa fa-square-o fa-fw'></i></td>
        <td><%= task %>
      </tr>
    </table>
  </li>
  ")

var WidgetTaskView = Backbone.View.extend({
  tagName: 'li',
  class: 'task',
  template: taskWidgetItem,
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this
  }
});

var TaskView = Backbone.View.extend({
  tagName: 'table',
  class: 'task-listing',
  template: taskListingTemplate,
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

// DashboardTaskView = Backbone.View.extend({
//   initialize: function() {
//     this.$el = $('#dash-task-display');
//   },
//   taskTemplate: _.template($('dashboard-task-template').html()),
//   render: function() {
//     this.$el.html(this.taskTemplate(this.model.attributes) );
//     return this
//   },
//   tagName: 'li',
//   events: {
//     'click .mark-complete' : 'markComplete',
//     'dblclick this' : 'showUpdateForm'
//   },
//   markComplete: function() {
//     // Change the task status to 'complete'
//     // Remove task from list
//     // For a few seconds show a placeholder with an 'undo' option
//     // Remove the placeholder
//   },
//   showUpdateForm: function() {
//     // Replace task display with an update form
//   }
// });