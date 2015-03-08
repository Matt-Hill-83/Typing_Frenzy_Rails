NinetyNineCats::Application.routes.draw do

  get 'static_pages/root'
  #
  # root :to => redirect('/test.html.erb')
  root to: 'static_pages#root'

  # get '/', :to => redirect('/views/root.html.erb')

  resources :cats, except: :destroy
  resources :cat_rental_requests, only: [:create, :new] do
    post "approve", on: :member
    post "deny", on: :member
  end
  resource :session, only: [:create, :destroy, :new]
  resources :users, only: [:create, :new]

  # root to: redirect("/cats")
  # get ':action' => 'static#:action'
  # root to: redirect("/static_pages")
end
