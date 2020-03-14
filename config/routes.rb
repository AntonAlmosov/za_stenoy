Rails.application.routes.draw do
  root 'page#index'
  devise_for :models

  resources :page do
  end

  resources :admin do
  end
end
