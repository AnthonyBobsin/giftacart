class OrderItem < ApplicationRecord
  belongs_to :order
  has_many :order_items
end