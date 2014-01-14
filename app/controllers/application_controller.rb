class ApplicationController < ActionController::Base
  before_action :use_port_9292

  protect_from_forgery with: :exception

  def use_port_9292
    class << request
      def port
        9292
      end
    end
  end

end
