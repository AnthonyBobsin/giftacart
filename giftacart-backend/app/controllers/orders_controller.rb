class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :update, :destroy]

  # GET /orders
  def index
    @orders = if filtering_params.present?
      Order.where(**filtering_params)
    else
      Order.all
    end

    apply_content_range_header("orders 0-10/#{(@orders.size / 10) + 1}")

    render json: @orders
  end

  # GET /orders/1
  def show
    render json: @order
  end

  # POST /orders
  def create
    @order = Order.new(order_params)

    if @order.save
      render json: @order, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1
  def update
    if @order.update(order_params)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    @order.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_order
    @order = Order.find(params[:id])
  end

  # Params to filter results by if passed
  def filtering_params
    JSON.parse(params[:filter] || "{}", symbolize_names: true).slice(:id, :fulfillment_date, :store_id, :timeslot_id, :bulk_order_num)
  end

  # Only allow a trusted parameter "white list" through.
  def order_params
    params.require(:order).permit(
      :user_id,
      :sub_total,
      :fulfillment_date,
      :fees_total,
      :tax_total,
      :final_total,
      :gift_comment,
      :store_id,
      :timeslot_id,
      :bulk_order_num,
      :status,
      order_items_attributes: [
        :name,
        :product_id,
        :quantity,
        :uom,
        :unit_price
      ]
    )
  end
end
