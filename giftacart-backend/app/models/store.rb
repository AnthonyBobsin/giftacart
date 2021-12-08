class Store < ApplicationRecord
    has_many :products
    has_many :time_slots
end
