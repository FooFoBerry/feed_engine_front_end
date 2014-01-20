class Repo
  def self.create(params)
    status, repo_data = repo_api.create_with(params)
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
end
