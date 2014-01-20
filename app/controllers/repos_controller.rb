class ReposController < ApplicationController

  def create
    status, repo = Repo.create(repo_params)
    if status == 201
      render :json => repo.as_json
    else
      render :json => "CRAP"
    end
  end

  def repo_params
    params.permit(:name, :project_id)
  end

end
