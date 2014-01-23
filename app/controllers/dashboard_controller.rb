class DashboardController < ApplicationController

  layout 'dashboard'

  def index
    data = { "name" => "FooFoBerry" }
    @project = Project.new(data)
  end
end
