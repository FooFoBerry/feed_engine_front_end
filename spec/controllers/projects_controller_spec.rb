require 'spec_helper'

describe ProjectsController do
  let(:params) { { :project => { :name => "FooFoBerry Project",
                                 :user_id => "1" } } }

  it "creates a project" do
    data = { :id => 2, :name => "FooFoBerry Project", :github_url => nil, :valid => nil }
    cookies[:user_id] = 1
    VCR.use_cassette "controller_create_project" do
      post :create, params
      expect(response.status).to eq(200)
      expect(response.body).to eq data.to_json
    end
  end
end
