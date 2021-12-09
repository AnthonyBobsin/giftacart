class CreateStores < ActiveRecord::Migration[6.0]
  def change
    create_table :stores do |t|
      t.string :name
      t.string :street_address
      t.string :city
      t.string :postal_code
      t.string :state
      t.string :country
      t.string :phone_number
      t.string :postal_codes, array: true

      t.timestamps
    end
  end
end
