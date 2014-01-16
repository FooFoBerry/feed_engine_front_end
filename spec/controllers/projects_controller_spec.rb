require 'spec_helper'

describe ProjectsController do
  let(:params) { { :project => { :name => "FooFoBerry Project",
                                 :user_id => "1" } } }

  it "creates a project" do
    # :TODO: NEEDS VCR

    post :create, params
    expect(response.status).to eq(302)
  end
end
