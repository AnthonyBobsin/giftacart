class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name
      t.decimal :unit_price
      t.belongs_to :store, null: false, foreign_key: true

      t.timestamps
    end
  end
end
