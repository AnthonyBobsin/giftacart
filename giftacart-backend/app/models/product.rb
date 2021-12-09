class Product < ApplicationRecord
  validates :unit_price, presence: true

  belongs_to :store
end
