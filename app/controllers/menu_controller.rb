class MenuController < ApplicationController
  def index
    pages = Page.all
    render :json => pages
  end
end
