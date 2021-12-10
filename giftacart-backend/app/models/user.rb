class User < ApplicationRecord
  validates :first_name, :street_address, :postal_code, presence: true

  belongs_to :store

  has_many :orders
end
