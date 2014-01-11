class ProjectsController < ApplicationController

  def index
    @user = User.find_by(id: cookies[:user_id])
    @user
  end

  def new
  end

end
