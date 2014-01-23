class Tracker
  def self.create(params)
    project_id = params[:project_id]
    pt_project_id = params[:pt_project_id]
    params = { 
      :tracker_project => { :pt_project_id => pt_project_id },
      :project_id => project_id
    }
    status, tracker_data = tracker_api.create_with(params)
    [status, new(tracker_data)]
  end

  def self.tracker_api
    foofo_api::TrackerProject.new
  end

  def self.foofo_api
    FooFoBerry
  end

  attr_reader :id, :pt_project_id

  def initialize(attributes)
    @id            = attributes["id"]
    @pt_project_id = attributes["pt_project_id"]
  end
end
