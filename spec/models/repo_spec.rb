require 'spec_helper'

describe Repo do
  it "should create a repo" do
    VCR.use_cassette "create_a_repo" do
      params = { :github_url => "foofoberry/costner_goes_postal", :project_id => 1 }
      status, repo = Repo.create(params)
      expect(status).to eq 201
      expect(repo.github_url).to eq "foofoberry/costner_goes_postal"
    end
  end
end
