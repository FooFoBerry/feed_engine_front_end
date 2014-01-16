FeedEngineFrontEnd::Application.routes.draw do
  scope :dashboard do
    root "projects#index"
    resources :projects
  end
end
