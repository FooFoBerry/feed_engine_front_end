class Project
  extend ActiveModel::Naming
  include ActiveModel::Conversion

  attr_accessor :id, :name, :github_url, :valid, :user_id

  def self.create(attributes = {})
    status, project_data = project_api.create_with({ :project => attributes })
    [status, new(project_data)]
  end

  def initialize(data = {})
    @id         = data["id"]
    @name       = data["name"]
    @github_url = data["github_url"]
    @valid      = data["valid"]
  end

  def self.all_for(user_id)
    project_store_api.projects_for(user_id)[1]
  end

  def valid?
    valid
  end

  def self.project_store_api
    foofo_api::ProjectStore.new
  end

  def self.project_api
    foofo_api::Project.new
  end

  def self.foofo_api
    FooFoBerry
  end

end
