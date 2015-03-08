NinetyNineCats::Application.routes.draw do

  get 'static_pages/root'
  root to: 'static_pages#root'

  resources :cats, except: :destroy
  resources :cat_rental_requests, only: [:create, :new] do
    post "approve", on: :member
    post "deny", on: :member
  end
  resource :session, only: [:create, :destroy, :new]
  resources :users, only: [:create, :new]

end
