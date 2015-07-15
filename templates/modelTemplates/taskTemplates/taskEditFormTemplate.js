var string = "<h3 class='form-title'>Edit Task</h3>\n  <table>\n    <tr class='form-group'>\n      <td><label for='title'>Title: </label></td>\n      <td><input class='form-control' type='text' name='title' title='Title' value='<%- model.get('title') %>' placeholder='Title (required)'></td>\n    </tr>\n    <tr class='form-group'>\n      <td><label for='deadline'>Deadline: </label></td>\n      <td><input class='form-control' type='date' name='deadline' title='Deadline' value='<%- model.get('deadline') %>' placeholder='Deadline'></td>\n    </tr>\n    <tr class='form-group'>\n      <td><label for='status'>Status: </label></td>\n      <td>\n        <select class='form-control half-width left' name='status' title='Status'>\n          <option<%- model.get('status') === 'New' ? ' selected' : ''%>>New</option>\n          <option<%- model.get('status') === 'In Progress' ? ' selected' : ''%>>In Progress</option>\n          <option<%- model.get('status') === 'Blocking' ? ' selected' : ''%>>Blocking</option>\n          <option>Complete</option>\n        </select>\n      </td>\n    </tr>\n    <tr class='form-group'>\n      <td><label for='priority'>Priority: </label></td>\n      <td>\n        <select class='form-control half-width right' name='priority' title='Priority'>\n          <option<%- model.get('priority') === 'Urgent' ? ' selected' : ''%>>Urgent</option>\n          <option<%- model.get('priority') === 'High' ? ' selected' : ''%>>High</option>\n          <option<%- model.get('priority') === 'Normal' ? ' selected' : ''%>>Normal</option>\n          <option<%- model.get('priority') === 'Low' ? ' selected' : ''%>>Low</option>\n          <option<%- model.get('priority') === 'Not Important' ? ' selected' : ''%>>Not Important</option>\n        </select>\n      </td>\n    </tr>\n    <tr class='form-group'>\n      <td><label for='description'>Notes: </label></td>\n      <td><textarea class='form-control' name='description' title='Notes' value='<%- model.get('description') %>' placeholder='Notes'></textarea></td>\n    </tr>\n  </table>\n  <button type='submit' title='Update Task' class='btn btn-dark btn-lg btn-block'>Update Task</button>\n</div>";

module.exports = string;
