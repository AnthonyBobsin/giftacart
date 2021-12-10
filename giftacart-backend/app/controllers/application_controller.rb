class ApplicationController < ActionController::API
  protected

  def apply_content_range_header(value)
    response.headers['Content-Range'] = value
  end
end
