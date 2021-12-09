class TimeSlot < ApplicationRecord
  validates :from_time, :to_time, presence: true

  belongs_to :store
end
