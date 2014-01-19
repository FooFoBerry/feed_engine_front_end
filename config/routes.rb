FeedEngineFrontEnd::Application.routes.draw do
  scope :dashboard do
    root "projects#index"
    resources :projects, :except => [:show]
    get 'projects/:id', :to => 'dashboard#index', :as => :project_dashboard
  end
end
