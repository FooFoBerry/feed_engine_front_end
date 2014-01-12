class ProjectsController < ApplicationController

  def index
    @user = User.find_by(id: cookies[:user_id])
    @user
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.create(params[:project])
    if @project.valid?
      flash[:notice] = "Successfully Created Project #{@project.name}"
      redirect_to root_path
    else
      flash[:notice] = "Something went wrong!"
      render new
    end
  end

end
