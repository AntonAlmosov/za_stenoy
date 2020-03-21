Rails.application.routes.draw do
  root 'page#index'
  devise_for :models

  resources :page, only: [:index, :show] do
  end

  resources :menu, only: [:index]

  resources :author, only: [:index, :create] do
    collection do
      get :get_author
    end
  end

  resources :compilation, only: [] do
    collection do
      get :get_compilations
      post :toggle_compilation
    end
  end

  resources :online_issue, only: [] do
    collection do
      get :get_online_issues
      post :toggle_online_issue
    end
  end


  resources :piece do 
  end

  resources :admin do
    resources :compilation, only: [:new, :edit, :create, :update, :destroy]
    resources :online_issue, only: [:new, :edit, :create, :update, :destroy]
  end
end
