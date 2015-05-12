@javascript
Feature: Dashboard home elements

  Background:
    Given I am on my dashboard

  # These data refer to the user object hard-coded in the test API. This user
  # has 5 tasks, 4 of which are incomplete. Note that values for resources other
  # than tasks are currently hard-coded

  Scenario Outline: Dashboard top widgets
    Then I should see my '<name>' widget
    And my '<name>' widget should say I have <num> <obj>

    Examples:
      | name            | num | obj                |
      | tasks           | 4   | incomplete tasks   |
      | deadlines       | 7   | upcoming deadlines |
      | appointments    | 4   | new appointments   |
      | recommendations | 14  | recommendations    |

  Scenario: Dashboard task panel

    Only tasks that are incomplete, not blocking, and not backlogged are shown

    Then I should see my task panel
    And my task panel should show 2 tasks
    And the task details should not be visible

  Scenario: Expand task list item
    When I click on the '#task-1' element
    Then I should see the '#task-1' element's '.task-details' element

  Scenario: Click the checkbox
    When I click on the mark-complete checkbox inside the '#task-1' element
    Then the mark-complete checkbox should be checked
    And there should be a line through the title in the '#task-1' element
    And the '#task-1' element should be removed from the DOM after a short time