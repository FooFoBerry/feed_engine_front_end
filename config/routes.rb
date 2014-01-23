FeedEngineFrontEnd::Application.routes.draw do
  scope :dashboard do
    root "projects#index"
    resources :projects, :except => [:show]
    resources :repos, :only => [:create]
    resources :tracker_projects, :only => [:create]
    get 'projects/:id', :to => 'dashboard#index', :as => :project_dashboard
  end
end
