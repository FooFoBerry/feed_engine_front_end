require 'spec_helper'

feature "Projects Admin Page" do

  scenario "when an authenticated user visits the project admin page" do
    u = User.new({ :name => "Tyler Long" })
    User.stub(:find_by).and_return(u)
    page.driver.browser.set_cookie 'user_id=1'
    visit root_url
    expect(User.find_by(:id => 1)).to eq u
    expect(page).to have_content "Tyler Long"
    expect(page).to have_content "Create Your First Project"
  end

end
