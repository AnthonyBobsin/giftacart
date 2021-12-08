class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name
      t.string :email
      t.string :street_address, null: false
      t.string :apartment_number
      t.string :city
      t.string :postal_code, null: false
      t.string :state
      t.string :country
      t.string :phone_number
      t.boolean :admin, default: false, null: false

      t.timestamps
    end
  end
end
