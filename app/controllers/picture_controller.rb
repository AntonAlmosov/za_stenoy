class PictureController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_admin!

  def upload_image
    picture = Picture.new()
    picture.attachment = params[:image]
    if picture.save!
      render :json => {
        success: 1,
        file: {
            url: polymorphic_url(picture.attachment),
        }
      }
    end
  end

  def upload_url
    picture = Picture.new(url: params[:image])
    if picture.save!
      render :json => {
        success: 1,
        file: {
            url: picture.url,
        }
      }
    end
  end
end
