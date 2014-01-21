require 'spec_helper'

describe ReposController do
  let(:params) { { :repo => { :github_url => "foofoberry/asdf",
                              :project_id => 1 } } }

  it "creates a repo" do
    data = { :id => 41, :github_url => "foofoberry/asdf",
              :gh_repo_id => nil }
    cookies.signed[:user_id] = 1
    VCR.use_cassette "controller_create_repo" do
      post :create, params
      expect(response.status).to eq(200)
      expect(response.body).to eq data.to_json
    end
  end
end
