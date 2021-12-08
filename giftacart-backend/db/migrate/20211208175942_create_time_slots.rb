class CreateTimeSlots < ActiveRecord::Migration[6.0]
  def change
    create_table :time_slots do |t|
      t.time :from_time
      t.time :to_time
      t.belongs_to :store, null: false, foreign_key: true

      t.timestamps
    end
  end
end
