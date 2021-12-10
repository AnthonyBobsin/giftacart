class Store < ApplicationRecord
    has_many :products
    has_many :time_slots
    has_many :users
end
