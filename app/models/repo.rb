class Repo
  def self.create(params)
    status, repo_data = repo_api.create_with({ :repo => params })
    [status, new(repo_data)]
  end

  def self.repo_store_api
    foofo_api::RepoStore.new
  end

  def self.repo_api
    foofo_api::Repo.new
  end

  def self.foofo_api
    FooFoBerry
  end

  attr_reader :id, :github_url, :gh_repo_id

  def initialize(attributes)
    @id         = attributes["id"]
    @github_url = attributes["github_url"]
    @gh_repo_id = attributes["gh_repo_id"]
  end
end
