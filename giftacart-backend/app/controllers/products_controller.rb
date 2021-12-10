class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  # GET /products
  def index
    @products = Product.joins(:store).select('products.*, stores.name as store_name')
    @products = if filtering_params.present?
      @products.where(**filtering_params)
    else
      @products.all
    end

    apply_content_range_header("products 0-10/#{(@products.size / 10) + 1}")

    render json: @products
  end

  # GET /products/1
  def show
    render json: @product
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Params to filter results by if passed
    def filtering_params
      JSON.parse(params[:filter] || "{}", symbolize_names: true).slice(:id, :store_id)
    end

    # Only allow a trusted parameter "white list" through.
    def product_params
      params.require(:product).permit(:name, :unit_price, :store_id)
    end
end
