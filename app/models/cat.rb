require 'action_view'
class Cat < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  CAT_COLORS = %w(black white orange brown)

  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :user_id
  )

  has_many(
    :rental_requests,
    class_name: "CatRentalRequest",
    dependent: :destroy
  )

  def age
    time_ago_in_words(birth_date)
  end

  validates(
    :birth_date,
    :color,
    :name,
    :sex,
    :user_id,
    presence: true
  )

  validates :color, inclusion: CAT_COLORS
  validates :sex, inclusion: %w(M F)
  validates_date :birth_date, :before => lambda { Date.today },
                              :before_message => "must be in the past"
end
