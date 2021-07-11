class NewsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_admin!, :except => [:show]

  def new
    @news = News.new
    @post_path = admin_news_index_path(params[:admin_id])
    @back_path = admin_path('news')
  end

  def create
    news = News.new()
    page = Page.friendly.find(params[:admin_id])
    news.title = params[:title]
    news.page_id = page.id
    news.text = params[:text]
    news.published = params[:published]
    news.featured = params[:featured]
    news.caption = params[:caption]
    news.note = params[:note]
    if params.has_key?(:cover) and params[:cover] != 'null'
      news.cover = params[:cover]
    end

    if news.featured
      News.where(featured: true).update(featured: false)
    end

    if news.save!
      render :json => {redirectPath: edit_admin_news_path(page.id, news.id), id: news.id}
    end
  end

  def upload_image
    puts params
  end

  def edit
    @news = News.find(params[:id])
    @post_path = admin_news_path(params[:id])
    @cover = ''
    if @news.cover.attached?
      @cover = polymorphic_url(@news.cover)
    end
    @close_path = news_path(@news.id)
    @back_path = admin_path('news')
  end

  def update
    news = News.find(params[:id])
    page = Page.friendly.find(0)
    news.title = params[:title]
    news.page_id = page.id
    news.text = params[:text]
    news.published = params[:published]
    news.featured = params[:featured]
    news.caption = params[:caption]
    news.note = params[:note]
    if params.has_key?(:cover) and params[:cover] != 'null'
      news.cover = params[:cover]
    elsif params[:cover] == 'null'
      news.cover.purge
    end

    fNews = News.find_by(featured: true)
    if fNews and news.featured and news.id != fNews.id
      fNews.update(featured: false)  
    end

    if news.save!
      render :json => {status: 'ok'}
    end
  end


  def get_news
    @news = News.all.sort_by(&:created_at)

    render :json => {news: @news}
  end

  def toggle_news
    @news = News.find(params[:id])
    hash = params[:hash]
    @news[hash] = params[:value]

    if hash == 'featured' and params[:value] == true
      @news.published = true
      newsFeatured = News.find_by(featured: true)
      if newsFeatured
        newsFeatured.update(featured: false)
      end
    end

    if @news.save!
      get_news
    end
  end

  def destroy
    @news = News.find(params[:id])

    if @news.cover.attached?
      @news.cover.destroy
    end

    if @news.destroy!
      get_news
    end
  end

  def show
    @news = News.find(params[:id])
    @cover = nil
    if @news.cover.attached?
      @cover = polymorphic_url(@news.cover)
    end
    @edit_path = edit_admin_news_path(@news.page_id, @news.id)
  end

end

