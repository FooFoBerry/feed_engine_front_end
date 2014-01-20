require 'spec_helper'

describe Repo do
  it "should create a repo" do
    params = { :name => "foofoberry/costner_goes_postal", :project_id => 1 }
    status, repo = Repo.create(params)
    expect(status).to eq 201
    expect(repo.name).to eq "foofoberry/costner_goes_postal"
    expect(repo.project_id).to eq 1
  end
end
