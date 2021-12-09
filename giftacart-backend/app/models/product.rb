class Product < ApplicationRecord
  validates :name, :unit_price, presence: true

  belongs_to :store
end
