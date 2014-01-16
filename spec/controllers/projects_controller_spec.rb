require 'spec_helper'

describe ProjectsController do
  let(:params) { { :project => { :name => "FooFoBerry Project",
                                 :user_id => "1" } } }

  it "creates a project" do
   # project = double
   # FooFoBerry::Project.any_instance.stub(:new).and_return(project)
   # expect(project).to receive(:create_with)

    post :create, params
    expect(response.status).to eq(302)
  end
end
