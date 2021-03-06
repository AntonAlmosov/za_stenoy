Rails.application.routes.draw do
  devise_for :admins
  root 'page#index'

  resources :page, only: [:index, :show] do
    resources :compilation, only: [:show]
    resources :online_issue, only: [:show]
    resources :offline_issue, only: [:show]
    resources :news, only: [:show]
  end

  resources :menu, only: [:index] do
    collection do 
      get :get_data
      get :check_authentication
    end
  end

  resources :picture, only: [] do
    collection do
      post :upload_image
      post :upload_url
    end
  end

  resources :author, only: [:create, :show] do
    collection do
      get :get_author
      post :get_author_pieces
      patch :update_status
      get :get_authors
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

  resources :news, only: [:show] do
    collection do
      get :get_news
      post :toggle_news
      post :upload_image
    end
  end

  resources :feature, only: [:index, :create] do 
    collection do 
      post :toggle_hidden
    end
  end

  resources :admin, only: [:index, :show, :edit, :update] do
    resources :compilation, only: [:new, :edit, :create, :update, :destroy]
    resources :online_issue, only: [:new, :edit, :create, :update, :destroy]
    resources :offline_issue, only: [:new, :edit, :create, :update, :destroy]
    resources :product, only: [:new, :edit, :create, :update, :destroy]
    resources :news, only: [:new, :edit, :create, :update, :destroy]
    resources :author, only: [:index, :edit, :destroy, :update]
    resources :order, only: [:index]
    post 'handle_reorder', :to => 'order#handle_reorder'
  end
end
