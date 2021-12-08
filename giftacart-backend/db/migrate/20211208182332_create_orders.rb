class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.decimal :sub_total
      t.datetime :fulfillment_date
      t.decimal :fees_total
      t.decimal :tax_total
      t.decimal :final_total
      t.string :gift_comment
      t.integer :store_id
      t.integer :timeslot_id
      t.string :bulk_order_num

      t.timestamps
    end
  end
end
