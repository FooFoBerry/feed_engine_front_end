class Project
  extend ActiveModel::Naming
  include ActiveModel::Conversion

  attr_accessor :name, :github_url, :valid

  def self.create(attributes = {})
    project_data = FooFoBerry.create_project_from(attributes)
    new(project_data)
  end

  def initialize(data = {})
    @name       = data[:name]
    @github_url = data[:github_url]
    @valid      = data[:valid]
  end

  def valid?
    valid
  end
end

class FooFoBerry
  def self.create_project_from(attributes)
    {
      :name => "FooFoBerry",
      :github_url => "http://github.com/foofoberry/foofoberry_api",
      :valid => true
    }
  end
end
