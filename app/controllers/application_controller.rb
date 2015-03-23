class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # Expose current_user method to the views
  helper_method :current_user
  helper_method :text
  helper_method :logged_in?

  private

  require 'csv'

  def read_csv
    # debugger
    csv_data = CSV.read 'test_words2.csv'

    # headers = csv_data.shift.map {|i| i.to_s }
    # string_data = csv_data.map {|row| row.map {|cell| cell.to_s } }
    # array_of_hashes = string_data.map {|row| Hash[*headers.zip(row).flatten] }
    puts 'test---------------'
    csv_data.to_a.flatten
  end


  def require_no_user!
    # redirect_to ??? unless current_user.nil?
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def text
    @text_array = ['apple', 'banana', 'carrot', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    @text_array = read_csv()
  end

  def logged_in?
    !current_user.nil?
  end

  def login_user!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout_user!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_user!
    redirect_to new_session_url if current_user.nil?
  end
end
