class NewsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_admin!

  def new
    @news = News.new
    @post_path = admin_news_index_path(params[:admin_id])
    @back_path = 'js'
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
end
