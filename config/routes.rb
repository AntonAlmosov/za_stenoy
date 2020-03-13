Rails.application.routes.draw do
  get 'admin/index'
  get 'home/index'
  root 'home#index'
  devise_for :models

  resources :admin do
    collection do
    end
  end
end
