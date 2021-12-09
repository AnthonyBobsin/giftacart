class CreateOrderItems < ActiveRecord::Migration[6.0]
  def change
    create_table :order_items do |t|
      t.belongs_to :order, null: false, foreign_key: true
      t.string :name
      t.integer :product_id, null: false
      t.float :quantity
      t.string :uom
      t.decimal :unit_price

      t.timestamps
    end
  end
end
