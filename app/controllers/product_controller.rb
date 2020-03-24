class ProductController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_admin!, :except => [:show, :index]

  def get_products
    @products = Product.all.sort_by(&:created_at)

    render :json => {products: @products}
  end

  def new
    @product = Product.new
    @cover = ''
    @post_path = admin_product_index_path
  end

  def create
    product = Product.new
    product.name = params[:name]
    product.price = params[:price]
    product.release_date = params[:release_date]
    product.purchase_link = params[:purchase_link]
    page = Page.friendly.find(params[:admin_id])
    product.page_id = page.id
    if params.has_key?(:cover)
      product.cover = params[:cover]
    end

    if product.save!
      render :json => {redirectPath: edit_admin_product_path(params[:admin_id], product.id), id: product.id}
    end
  end

  def edit
    @product = Product.find(params[:id])
    @post_path = admin_product_path(params[:admin_id], params[:id])

    @cover = ''
    if @product.cover.attached?
      @cover = polymorphic_url(@product.cover)
    end
  end

  def update
    product = Product.find(params[:id])

    if params.has_key?(:cover)
      if product.update(name: params[:name], price: params[:price], release_date: params[:release_date], purchase_link: params[:purchase_link], cover: params[:cover])
        render :json => {status: 'ok'}
      end
    else
      if product.update(name: params[:name], price: params[:price], release_date: params[:release_date], purchase_link: params[:purchase_link])
        render :json => {status: 'ok'}
      end
    end
  end

  def destroy
    product = Product.find(params[:id])

    product.cover.destroy

    if product.destroy!
      get_products
    end
  end

end
