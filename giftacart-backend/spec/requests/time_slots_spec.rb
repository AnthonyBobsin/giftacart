require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/time_slots", type: :request do
  # This should return the minimal set of attributes required to create a valid
  # TimeSlot. As you add validations to TimeSlot, be sure to
  # adjust the attributes here as well.
  let(:store_1) do
    Store.create!(
      {
        name: "Liberty Village Store #1",
        street_address: "190 Liberty Street",
        city: "Toronto",
        postal_code: "M6K3L5",
        state: "Ontario",
        country: "Canada",
        phone_number: "555-123-4567",
        postal_codes: []
      }
    )
  end

  let(:store_2) do
    Store.create!(
      {
        name: "Harbourfront Store #2",
        street_address: "309 Queens Quay",
        city: "Toronto",
        postal_code: "M2V6L4",
        state: "Ontario",
        country: "Canada",
        phone_number: "555-123-3237",
        postal_codes: []
      }
    )
  end

  let(:valid_attributes) {
    {
      from_time: "09:00:00".to_time,
      to_time: "10:00:00".to_time,
      store_id: store_1.id,
    }
  }

  let(:invalid_attributes) {
    {
      from_time: nil,
      to_time: nil,
      store_id: store_1.id,
    }
  }

  # This should return the minimal set of values that should be in the headers
  # in order to pass any filters (e.g. authentication) defined in
  # TimeSlotsController, or in your router and rack
  # middleware. Be sure to keep this updated too.
  let(:valid_headers) {
    {}
  }

  describe "GET /index" do
    it "renders a successful response" do
      TimeSlot.create! valid_attributes
      get time_slots_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end

    it "fetches timeslots for store" do
      TimeSlot.create! valid_attributes
      TimeSlot.create! valid_attributes.merge({ store_id: store_2.id })
      get time_slots_url({ store_id: store_1.id }), headers: valid_headers, as: :json

      expect(response).to be_successful
      expect(JSON.parse(response.body).size).to eq(1)
      expect(JSON.parse(response.body)[0]["store_id"]).to eq(1)
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      time_slot = TimeSlot.create! valid_attributes
      get time_slot_url(time_slot), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new TimeSlot" do
        expect {
          post time_slots_url,
               params: { time_slot: valid_attributes }, headers: valid_headers, as: :json
        }.to change(TimeSlot, :count).by(1)
      end

      it "renders a JSON response with the new time_slot" do
        post time_slots_url,
             params: { time_slot: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new TimeSlot" do
        expect {
          post time_slots_url,
               params: { time_slot: invalid_attributes }, as: :json
        }.to change(TimeSlot, :count).by(0)
      end

      it "renders a JSON response with errors for the new time_slot" do
        post time_slots_url,
             params: { time_slot: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        {
          from_time: "09:00:00".to_time,
          to_time: "11:00:00".to_time,
        }
      }

      it "updates the requested time_slot" do
        time_slot = TimeSlot.create! valid_attributes
        patch time_slot_url(time_slot),
              params: { time_slot: new_attributes }, headers: valid_headers, as: :json
        time_slot.reload
        expect(time_slot.from_time).to eq(new_attributes[:from_time])
        expect(time_slot.to_time).to eq(new_attributes[:to_time])
      end

      it "renders a JSON response with the time_slot" do
        time_slot = TimeSlot.create! valid_attributes
        patch time_slot_url(time_slot),
              params: { time_slot: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the time_slot" do
        time_slot = TimeSlot.create! valid_attributes
        patch time_slot_url(time_slot),
              params: { time_slot: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested time_slot" do
      time_slot = TimeSlot.create! valid_attributes
      expect {
        delete time_slot_url(time_slot), headers: valid_headers, as: :json
      }.to change(TimeSlot, :count).by(-1)
    end
  end
end
