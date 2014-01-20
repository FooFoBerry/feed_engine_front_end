require 'spec_helper'

describe ReposController do
  let(:params) { { :repo => { :name => "foofoberry/costner_goes_postal",
                              :project_id => 1 } } }

  it "creates a repo" do
    data = { :id => 1, :github_url => "foofoberry/costner_goes_postal" }
    cookies[:user_id] = 1
    VCR.use_cassette "controller_create_repo" do
      post :create, params
      expect(response.status).to eq(200)
      expect(response.body).to eq data.to_json
    end
  end
end
