class PageController < ApplicationController
  def index
  end

  def show
    @page = Page.friendly.find(params[:id])
  end
end
