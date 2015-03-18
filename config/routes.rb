TypingFrenzy::Application.routes.draw do

  get 'static_pages/root'
  root to: 'static_pages#root'

  resource :session, only: [:create, :destroy, :new]
  resources :users, only: [:create, :new]

end
