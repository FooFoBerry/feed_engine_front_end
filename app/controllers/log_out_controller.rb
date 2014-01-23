class LogOutController < ApplicationController 

  def destroy
    cookies.delete :uid
    cookies.delete :user_id
    cookies.delete :user_name
    redirect_to "#{request.base_url}/"
  end

end
