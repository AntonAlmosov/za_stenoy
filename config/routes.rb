Rails.application.routes.draw do
  devise_for :admins
  root 'page#index'

  resources :page, only: [:index, :show] do
    resources :compilation, only: [:show]
    resources :online_issue, only: [:show]
    resources :offline_issue, only: [:show]
  end

  resources :menu, only: [:index] do
    collection do 
      get :get_data
    end
  end

  resources :author, only: [:index, :create, :show] do
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
      post :get_online_issues
      post :toggle_issue
    end
  end

  resources :piece do 
  end


  resources :offline_issue, only: [] do 
    collection do
      post :get_offline_issues
      post :toggle_issue
      post :handle_pages
      post :delete_page
    end
  end

  resources :product, only: [] do
    collection do
      get :get_products
    end
  end

  resources :feature, only: [:index, :create]

  resources :admin, only: [:index, :show, :edit, :update] do
    resources :compilation, only: [:new, :edit, :create, :update, :destroy]
    resources :online_issue, only: [:new, :edit, :create, :update, :destroy]
    resources :offline_issue, only: [:new, :edit, :create, :update, :destroy]
    resources :product, only: [:new, :edit, :create, :update, :destroy]
  end
end
