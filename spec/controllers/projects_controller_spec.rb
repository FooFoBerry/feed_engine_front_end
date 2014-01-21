require 'spec_helper'

describe ProjectsController do
  let(:params) { { :project => { :name => "FooFoBerry Project",
                                 :user_id => "1" } } }

  it "creates a project" do
    cookies.signed[:user_id] = 1
    VCR.use_cassette "controller_create_project" do
      post :create, params
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["name"]).to eq "FooFoBerry Project"
    end
  end
end
