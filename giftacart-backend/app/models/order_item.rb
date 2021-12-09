class OrderItem < ApplicationRecord
  validates :quantity, :unit_price, presence: true
  belongs_to :order
end
