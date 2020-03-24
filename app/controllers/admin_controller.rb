class AdminController < ApplicationController
  before_action :authenticate_admin!

  def index
    @pages = Page.all
  end

  def show
    @page = Page.friendly.find(params[:id])
  end
end
