# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_09_223700) do

  create_table "order_items", force: :cascade do |t|
    t.integer "order_id", null: false
    t.string "name"
    t.integer "product_id", null: false
    t.float "quantity"
    t.string "uom"
    t.decimal "unit_price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_id"], name: "index_order_items_on_order_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "user_id", null: false
    t.decimal "sub_total"
    t.datetime "fulfillment_date"
    t.decimal "fees_total"
    t.decimal "tax_total"
    t.decimal "final_total"
    t.string "gift_comment"
    t.integer "store_id"
    t.integer "timeslot_id"
    t.string "bulk_order_num"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "status"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.decimal "unit_price"
    t.integer "store_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["store_id"], name: "index_products_on_store_id"
  end

  create_table "stores", force: :cascade do |t|
    t.string "name"
    t.string "street_address"
    t.string "city"
    t.string "postal_code"
    t.string "state"
    t.string "country"
    t.string "phone_number"
    t.string "postal_codes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "time_slots", force: :cascade do |t|
    t.time "from_time"
    t.time "to_time"
    t.integer "store_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["store_id"], name: "index_time_slots_on_store_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name"
    t.string "email"
    t.string "street_address", null: false
    t.string "apartment_number"
    t.string "city"
    t.string "postal_code", null: false
    t.string "state"
    t.string "country"
    t.string "phone_number"
    t.boolean "admin", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "order_items", "orders"
  add_foreign_key "orders", "users"
  add_foreign_key "products", "stores"
  add_foreign_key "time_slots", "stores"
end
