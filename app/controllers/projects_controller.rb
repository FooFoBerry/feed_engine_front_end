class ProjectsController < ApplicationController

  def index
    #@user = User.find_by(id: cookies[:user_id])
    @user = current_user_id
  end

  def new
    @project = Project.new
  end

  def create
    project_params = params[:project].merge(:user_id => current_user_id)
    status, @project = Project.create(project_params)
    if status == 201
      flash[:notice] = "Successfully Created Project #{@project.name}"
      redirect_to root_path
    else
      flash[:notice] = "Something went wrong!"
      render :new
    end
  end

end
