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

  resources :admin do
    resources :compilation, only: [:new, :edit, :create, :update, :destroy]
    resources :online_issue, only: [:new, :edit, :create, :update, :destroy]
    resources :offline_issue, only: [:new, :edit, :create, :update, :destroy]
    resources :product, only: [:new, :edit, :create, :update, :destroy]
  end
end
