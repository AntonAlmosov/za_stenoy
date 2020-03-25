class AdminController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_admin!

  def index
    @pages = Page.all.sort_by(&:created_at)
  end

  def show
    @page = Page.friendly.find(params[:id])
  end

  def edit
    @token = @verifier.generate("upload", :admin)

    @page = Page.friendly.find(params[:id])
    @cover = ''
    if @page.cover.attached?
      @cover = polymorphic_url(@page.cover)
    end
    @post_path = admin_path(@page.id)
  end

  def edit
    @page = Page.friendly.find(params[:id])
    @cover = ''
    if @page.cover.attached?
      @cover = polymorphic_url(@page.cover)
    end
    @post_path = admin_path(@page.id)
  end

  def update
    page = Page.find(params[:id])

    # @verifier.verify(params[:token], purpose: :admin)
    
    if params.has_key?(:cover)
      page.cover.attach(params[:cover])
      if page.update(description: params[:description])
        render :json => {status: 'ok'}
      end
    else
      if page.update(description: params[:description])
        render :json => {status: 'ok'}
      end
    end
  end
end
