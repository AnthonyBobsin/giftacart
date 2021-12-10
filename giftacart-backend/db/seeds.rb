# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'time'

stores = Store.create([{name: "Costco", street_address: "50 Beale St, San Francisco, CA"}, {name: "Marianos", street_address: "345 W Roosevelt Rd, Lombard, IL 60148"}])

time_slots = []
slot_start_time = Time.now.next_day.change(hour: 10, min: 0, sec: 0)
slot_end_time = Time.now.next_day(2).change(hour: 20, min: 0, sec: 0)

while slot_start_time < slot_end_time
  if slot_start_time.hour >= 10 && slot_start_time.hour < 20
    time_slots << { from_time: slot_start_time, to_time: slot_start_time + 1.hour, store_id: stores[0].id }
  end

  slot_start_time += 3600
end

timeslots = TimeSlot.create(time_slots)
products = Product.create(
	[
		{
			name: "Red Wine Merlot",
			unit_price: "14.99",
			image_url: "https://www.lcbo.com/content/dam/lcbo/products/140129.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
			store_id: stores.first.id,
		},
		{
			name: "Crackers",
			unit_price: "3.99",
			image_url: "https://www.lcbo.com/content/dam/lcbo/products/140129.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
			store_id: stores.first.id,
		},
		{
			name: "Cheese",
			unit_price: "5.99",
			image_url: "https://www.lcbo.com/content/dam/lcbo/products/140129.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
			store_id: stores.first.id,
		}
	]
)
