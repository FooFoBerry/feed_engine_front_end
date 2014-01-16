class ProjectsController < ApplicationController

  def index
    #@user = User.find_by(id: cookies[:user_id])
    @user = cookies[:user_id]
  end

  def new
    @project = Project.new
  end

  def create
    status, @project = Project.create(params[:project])
    if status == 201
      flash[:notice] = "Successfully Created Project #{@project.name}"
      redirect_to root_path
    else
      flash[:notice] = "Something went wrong!"
      render :new
    end
  end

end
