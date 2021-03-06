class ApplicationController < ActionController::Base
  #protect_from_forgery with: :exception

  def current_user_id
    @user_id ||= cookies.signed[:user_id]
  end
end
