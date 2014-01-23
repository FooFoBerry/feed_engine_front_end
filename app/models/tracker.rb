class Tracker
  def self.create(params)
    binding.pry
    status, tracker_data = tracker_api.create_with({ :tracker_project => params })
    [status, new(tracker_data)]
  end

  def self.tracker_api
    foofo_api::Tracker.new
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
