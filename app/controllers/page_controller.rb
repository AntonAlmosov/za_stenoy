class PageController < ApplicationController
  require 'json'
  def index
    pages = Page.all.sort_by(&:created_at)
    @pages = []

    @edit_path = false
    if admin_signed_in?
      @edit_path = admin_index_path
    end

    Time::DATE_FORMATS[:custom_datetime] = "%d.%m.%Y"

    feature_data = Feature.first
    feat = false
    if feature_data
      issue = {}
      url = ''
      publish_date = ''
      caption = ''
      if feature_data.feature_type == 'offline_issue'
        issue = OfflineIssue.find(feature_data.origin_id)
        publish_date = issue.publish_date
        url = page_offline_issue_path(issue.page_id, issue.id)
      end
      if feature_data.feature_type == 'online_issue'
        issue = OnlineIssue.find(feature_data.origin_id)
        caption = 'онлайн выпуск'
        publish_date = issue.updated_at.to_s(:custom_datetime)
        url = page_online_issue_path(issue.page_id, issue.id)
      end
      if feature_data.feature_type == 'content'
        issue = Content.find(feature_data.origin_id)
        publish_date = issue.updated_at.to_s(:custom_datetime)
        url = page_compilation_path(issue.page_id, issue.id)
      end

      if issue.cover.attached?
        feat = {title: issue.title, caption: caption,  publish_date: publish_date, url: url, cover: polymorphic_url(issue.cover)}
      else
        feat = {title: issue.title, caption: caption,  publish_date: publish_date, url: url}
      end
    end
    @feature = feat

    pages.each do |page|
      if page.page_type == 'personal_projects'
        comp = page.compilations.find_by(featured: true)
        if comp and comp.cover.attached? 
          feature = {title: comp.title, cover: polymorphic_url(comp.cover), date: comp.updated_at.to_s(:custom_datetime)}
        end
      end

      if page.page_type == 'magasine' || page.page_type == 'magasine_inversed'
        offline = page.offline_issues.find_by(featured: true)
        online = page.online_issues.find_by(featured: true)

        if offline and offline.cover.attached?
          feature = {title: offline.title, cover: polymorphic_url(offline.cover), date: offline.publish_date}
        elsif online and online.cover.attached?
          feature = {title: online.title, cover: polymorphic_url(online.cover), date: online.updated_at.to_s(:custom_datetime), caption: 'онлайн выпуск'}
        end
      end

      if page.page_type == 'shop'
        product = page.products.last
        if product and product.cover.attached?
          feature = {title: product.name, cover: polymorphic_url(product.cover), date: product.updated_at.to_s(:custom_datetime), caption: product.price}
        end
      end

      if page.page_type == 'news'
        news = page.news.last
        if news and news.cover.attached?
          feature = {title: news.title, cover: polymorphic_url(news.cover), date: product.updated_at.to_s(:custom_datetime)}
        end
      end

      @pages.push({id: page.id, slug: page.slug, title: page.title, page_type: page.page_type, feature: feature})
    end
  end

  def show
    @page = Page.friendly.find(params[:id])
    @content = []
    @feature = {}
    @cover = ''
    if @page.cover.attached?
      @cover = polymorphic_url(@page.cover)
    end

    @edit_path = false
    if admin_signed_in?
      if @page.page_type == 'about_us'
        @edit_path = edit_admin_path(@page.id)
      else
        @edit_path = admin_path(@page.id)
      end
    end

    if @page.page_type == 'personal_projects'
      @page.compilations.where(published: true, featured: false).each do |comp|
        if comp.cover.attached?
          @content.push({url: page_compilation_path(@page.id, comp.id), title: comp.title, cover: polymorphic_url(comp.cover), date: comp.updated_at.to_s(:custom_datetime)})
        else
          @content.push({url: page_compilation_path(@page.id, comp.id), title: comp.title, date: comp.updated_at.to_s(:custom_datetime)})
        end
      end
      f = @page.compilations.find_by(featured: true, published: true)
      if f
        if f.cover.attached?
          @feature = {url: page_compilation_path(@page.id, f.id), title: f.title, cover: polymorphic_url(f.cover), date: f.updated_at.to_s(:custom_datetime)}
        else
          @feature = {url: page_compilation_path(@page.id, f.id), title: f.title, date: f.updated_at.to_s(:custom_datetime)}
        end
      else
        @feature = false
      end
    end

    if @page.page_type == 'magasine'
      issues = (@page.online_issues.where(published: true, featured: false) + @page.offline_issues.where(published: true, featured: false)).sort_by(&:created_at)
      issues.each do |issue|
        if issue.has_attribute?("publish_date")
          if issue.cover.attached?
            @content.push({url: page_offline_issue_path(@page.id, issue.id), cover: polymorphic_url(issue.cover), title: issue.title, date: issue.publish_date})
          else
            @content.push({url: page_offline_issue_path(@page.id, issue.id), title: issue.title, date: issue.publish_date})
          end
        else
          if issue.cover.attached?
            @content.push({url: page_online_issue_path(@page.id, issue.id), cover: polymorphic_url(issue.cover), title: issue.title, date: issue.created_at.to_s(:custom_datetime)})
          else
            @content.push({url: page_online_issue_path(@page.id, issue.id), title: issue.title, date: issue.created_at.to_s(:custom_datetime)})
          end
        end
      end

      f = @page.online_issues.find_by(featured: true, published: true) || @page.offline_issues.find_by(featured: true, published: true)
      if f
        if f.has_attribute?("publish_date")
          if f.cover.attached?
            @feature = {url: page_offline_issue_path(@page.id, f.id), title: f.title, cover: polymorphic_url(f.cover), date: f.created_at.to_s(:custom_datetime)}
          else
            @feature = {url: page_offline_issue_path(@page.id, f.id), title: f.title, date: f.created_at.to_s(:custom_datetime)}
          end
        else
          if f.cover.attached?
            @feature = {url: page_online_issue_path(@page.id, f.id), title: f.title, cover: polymorphic_url(f.cover), date: f.created_at.to_s(:custom_datetime)}
          else
            @feature = {url: page_online_issue_path(@page.id, f.id), title: f.title, date: f.created_at.to_s(:custom_datetime)}
          end
        end
      else
        @feature = false
      end
    end

    if @page.page_type == 'magasine_inversed'
      issues = (@page.online_issues.where(published: true, featured: false) + @page.offline_issues.where(published: true, featured: false)).sort_by(&:created_at)
      issues.each do |issue|
        if issue.has_attribute?("publish_date")
          if issue.cover.attached?
            @content.push({url: page_offline_issue_path(@page.id, issue.id), cover: polymorphic_url(issue.cover), title: issue.title, date: issue.publish_date})
          else
            @content.push({url: page_offline_issue_path(@page.id, issue.id), title: issue.title, date: issue.publish_date})
          end
        else
          if issue.cover.attached?
            @content.push({url: page_online_issue_path(@page.id, issue.id), cover: polymorphic_url(issue.cover), title: issue.title, date: issue.created_at.to_s(:custom_datetime)})
          else
            @content.push({url: page_online_issue_path(@page.id, issue.id), title: issue.title, date: issue.created_at.to_s(:custom_datetime)})
          end
        end
      end

      f = @page.online_issues.find_by(featured: true, published: true) || @page.offline_issues.find_by(featured: true, published: true)
      if f
        puts 'Title :'
        puts f.title
        if f.has_attribute?("publish_date")
          if f.cover.attached?
            @feature = {url: page_offline_issue_path(@page.id, f.id), title: f.title, cover: polymorphic_url(f.cover), date: f.created_at.to_s(:custom_datetime)}
          else
            @feature = {url: page_offline_issue_path(@page.id, f.id), title: f.title, date: f.created_at.to_s(:custom_datetime)}
          end
        else
          if f.cover.attached?
            @feature = {url: page_online_issue_path(@page.id, f.id), title: f.title, cover: polymorphic_url(f.cover), date: f.created_at.to_s(:custom_datetime)}
          else
            @feature = {url: page_online_issue_path(@page.id, f.id), title: f.title, date: f.created_at.to_s(:custom_datetime)}
          end
        end
      else
        @feature = false
      end
    end

    if @page.page_type == 'shop'
      @page.products.each do |prod|
        if prod.cover.attached?
          @content.push({cover: polymorphic_url(prod.cover), title: prod.name, date: prod.release_date, url: prod.purchase_link, caption: prod.price})
        else
          @content.push({title: prod.name, date: prod.release_date, url: prod.purchase_link})
        end
      end
    end

    if @page.page_type == 'news'
      newsCollection = @page.news.where(published: true, featured: false).sort_by(&:created_at)
      newsCollection.each do |news|
        if news.cover.attached?
          @content.push({cover: polymorphic_url(news.cover), title: news.title, date: news.created_at.to_s(:custom_datetime), url: page_news_path(@page.id, news.id)})
        else
          @content.push({title: news.title, date: news.created_at.to_s(:custom_datetime), url: page_news_path(@page.id, news.id)})
        end
      end
      f = @page.news.where(published: true, featured: true)
      if f.exists?
        if f.cover.attached?
          @featured.push({cover: polymorphic_url(news.cover), title: news.title, date: news.created_at.to_s(:custom_datetime), url: page_news_path(@page.id, news.id)})
        else
          @featured.push({title: news.title, date: news.created_at.to_s(:custom_datetime), url: page_news_path(@page.id, news.id)})
        end
      else
        @featured = false
      end
    end
  end

end
