require 'spec_helper'

feature "Projects Admin Page" do

  before :each do
    u = User.new({ :name => "Tyler Long" })
    User.stub(:find_by).and_return(u)
    page.driver.browser.set_cookie 'user_id=1'
  end

  scenario "when an authenticated user visits the project admin page" do
    visit root_url
    expect(page).to have_content "Tyler Long"
    expect(page).to have_content "Create Your First Project"
  end

  scenario "when an auth user clicks on create project" do
    visit root_url
    click_on "Create Your First Project"
    expect(page.status_code).to eq 200
    expect(page.current_url).to eq new_project_url
    expect(page).to have_content "Your Project Name"
  end

end
