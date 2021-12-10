class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = if filtering_params.present?
      User.where(**filtering_params)
    else
      User.all
    end

    apply_content_range_header("users 0-10/#{(@users.size / 10) + 1}")

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Params to filter results by if passed
  def filtering_params
<<<<<<< HEAD
    params.slice(:store_id).permit!
=======
    JSON.parse(params[:filter] || "{}", symbolize_names: true).slice(:id)
>>>>>>> 99d357dd2a1e86937bef932b30e0caf34dc52608
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :street_address, :apartment_number, :city, :postal_code, :state, :country, :phone_number, :admin, :store_id)
  end
end
