class CreateTimeSlots < ActiveRecord::Migration[6.0]
  def change
    create_table :time_slots do |t|
      t.datetime :from_time
      t.datetime :to_time
      t.belongs_to :store, null: false, foreign_key: true

      t.timestamps
    end
  end
end
