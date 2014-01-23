class TrackerProjectsController < ApplicationController
  def create
    status, tracker = Tracker.create(tracker_params)
    if status == 201
      render :json => tracker.as_json
    else
      render :json => "CRAP"
    end
  end

  def tracker_params
    params.require(:tracker).permit(:pt_project_id, :project_id)
  end
end
