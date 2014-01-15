FeedEngineFrontEnd::Application.routes.draw do
  root "projects#index"
  resources :projects
  get '/dashboard', :to => 'dashboard#index'
end
