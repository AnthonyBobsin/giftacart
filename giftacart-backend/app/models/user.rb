class User < ApplicationRecord
  validates :first_name, :street_address, :postal_code, presence: true
end
