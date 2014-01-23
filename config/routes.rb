FeedEngineFrontEnd::Application.routes.draw do
  scope :dashboard do
    root "projects#index"
    resources :projects, :except => [:show]
    resources :repos, :only => [:create]
    get 'projects/:id', :to => 'dashboard#index', :as => :project_dashboard
   
    resources :log_out do
      collection do
        post :destroy
      end
    end

  end
end
