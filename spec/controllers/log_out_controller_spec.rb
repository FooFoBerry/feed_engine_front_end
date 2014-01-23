require "spec_helper"

describe LogOutController do 
  before :each do 
    cookies.signed[:uid]     = 123
    cookies.signed[:user_id] = 321
    cookies.signed[:user_name] = "foobers"
  end

  it "nukes the whole cookie" do 
    post :destroy

    expect(cookies.signed[:uid]).to be_nil
    expect(cookies.signed[:user_id]).to be_nil
    expect(cookies.signed[:user_name]).to be_nil
  end
end
