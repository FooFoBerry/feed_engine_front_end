require 'spec_helper'

describe ProjectsController do
  let(:params) { { :project => { :name => "FooFoBerry Project",
                                 :user_id => "1" } } }

  it "creates a project" do
    VCR.use_cassette "controller_create_project" do
      post :create, params
      expect(response.status).to eq(200)
    end
  end
end
