Given(/^I am not logged in$/) do 
  page.driver.clear_cookies
end

Given(/^I am logged in$/) do 
  visit('/') # It says "access denied" unless I visit some goddamned place first
  page.driver.set_cookie('auth', 'dGVzdHVzZXI6dGVzdHVzZXI%3D')
  page.driver.set_cookie('userID', 1)
end

When(/^I click on the '(\S*)' element$/) do |selector|
  find(selector).click
end

When(/^I double-click the '(.*)' element$/) do |selector|
  evaluate_script("\$\('#{selector}'\).dblclick\(\)")
end

When(/^I fill in the '(.*)' field with '(.*)'$/) do |field, value|
  fill_in field, with: value
end

When(/^I navigate to '(.*)'$/) do |url|
  visit url
end

When(/^I navigate to the dashboard$/) do 
  visit '/#dashboard'
end

Then(/^I should be on my dashboard$/) do 
  expect(page).to have_css('.dashboard-home')
end

Then(/^I should (not )?be routed to my dashboard$/) do |neg|
  wait_for_ajax
  save_screenshot 'screenshot.png'
  if neg
    expect(page).not_to have_selector('#dashboard-wrapper')
  else
    expect(find '#dashboard-wrapper').to be_visible
  end
end

Then(/^I should (not )?see the '(\S+)' element$/) do |neg, selector|
  if neg then expect(page).not_to have_css(selector) 
  else expect(page).to have_selector(selector, visible: true); end
end