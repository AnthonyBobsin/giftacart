class Order < ApplicationRecord
  validates :fulfillment_date, :store_id, :timeslot_id, :bulk_order_num, presence: true

  belongs_to :user
  has_many :order_items, inverse_of: :order

  accepts_nested_attributes_for :order_items
end
