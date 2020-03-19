Rails.application.routes.draw do
  root 'page#index'
  devise_for :models

  resources :page do
  end

  resources :menu, only: [:index]

  resources :author, only: [:index, :create] do
    collection do
      get :get_author
    end
  end

  resources :admin do
    resources :piece, only: [:index, :new, :edit, :create, :update, :destroy]
  end
end
