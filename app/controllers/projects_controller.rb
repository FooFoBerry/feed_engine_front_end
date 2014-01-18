class ProjectsController < ApplicationController

  def index
    @user = current_user_id
    @projects = Project.all_for(current_user_id)
  end

  def new
    @project = Project.new
  end

  def create
    project_params = params[:project].merge(:user_id => current_user_id)
    status, @project = Project.create(project_params)
    if status == 201
      binding.pry
      render :json => @project.to_json
    else
      #flash[:notice] = "Something went wrong!"
      #render :new
    end
  end

end
