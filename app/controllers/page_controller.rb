class PageController < ApplicationController
  require 'json'
  def index
    pages = Page.all
    @pages = []
    Time::DATE_FORMATS[:custom_datetime] = "%d.%m.%Y"
    @feature = false

    pages.each do |page|
      if page.page_type == 'personal_projects'
        comp = page.compilations.find_by(featured: true)
        if comp and comp.cover.attached? 
          feature = {title: comp.title, cover: polymorphic_url(comp.cover), date: comp.created_at.to_s(:custom_datetime)}
        end
      end

      if page.page_type == 'magasine' || page.page_type == 'magasine_inversed'
        offline = page.offline_issues.find_by(featured: true)
        online = page.online_issues.find_by(featured: true)

        if offline and offline.cover.attached?
          feature = {title: offline.title, cover: polymorphic_url(offline.cover), date: offline.publish_date}
        elsif online and online.cover.attached?
          feature = {title: online.title, cover: polymorphic_url(online.cover), date: online.created_at.to_s(:custom_datetime), caption: 'онлайн выпуск'}
        end
      end

      if page.page_type == 'shop'
        product = page.products.last
        if product and product.cover.attached?
          feature = {title: product.name, cover: polymorphic_url(product.cover), date: product.created_at.to_s(:custom_datetime), caption: product.price}
        end
      end

      @pages.push({id: page.id, slug: page.slug, title: page.title, page_type: page.page_type, feature: feature})
    end
  end

  def show
    @page = Page.friendly.find(params[:id])
    @content = []
    @feature = {}

    if @page.page_type == 'personal_projects'
      @page.compilations.where(published: true, featured: false).each do |comp|
        if comp.cover.attached?
          @content.push({url: page_compilation_path(@page.id, comp.id), title: comp.title, cover: polymorphic_url(comp.cover.variant(resize_to_limit: [1000, 1000])), date: comp.created_at.to_s(:custom_datetime)})
        else
          @content.push({url: page_compilation_path(@page.id, comp.id), title: comp.title, date: comp.created_at.to_s(:custom_datetime)})
        end
      end
      f = @page.compilations.find_by(featured: true)
      if f
        if f.cover.attached?
          @feature = {url: page_compilation_path(@page.id, f.id), title: f.title, cover: polymorphic_url(f.cover.variant(resize_to_limit: [1000, 1000])), date: f.created_at.to_s(:custom_datetime)}
        else
          @feature = {url: page_compilation_path(@page.id, f.id), title: f.title, date: f.created_at.to_s(:custom_datetime)}
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
            @content.push({url: page_offline_issue_path(@page.id, issue.id), cover: polymorphic_url(issue.cover.variant(resize_to_limit: [1000, 1000])), title: issue.title, date: issue.publish_date})
          else
            @content.push({url: page_offline_issue_path(@page.id, issue.id), title: issue.title, date: issue.publish_date})
          end
        else
          if issue.cover.attached?
            @content.push({url: page_online_issue_path(@page.id, issue.id), cover: polymorphic_url(issue.cover.variant(resize_to_limit: [1000, 1000])), title: issue.title, date: issue.created_at.to_s(:custom_datetime)})
          else
            @content.push({url: page_online_issue_path(@page.id, issue.id), title: issue.title, date: issue.created_at.to_s(:custom_datetime)})
          end
        end
      end

      f = @page.online_issues.find_by(featured: true) || @page.offline_issues.find_by(featured: true)
      if f
        if f.has_attribute?("publish_date")
          if f.cover.attached?
            @feature = {url: page_offline_issue_path(@page.id, f.id), title: f.title, cover: polymorphic_url(f.cover.variant(resize_to_limit: [1000, 1000])), date: f.created_at.to_s(:custom_datetime)}
          else
            @feature = {url: page_offline_issue_path(@page.id, f.id), title: f.title, date: f.created_at.to_s(:custom_datetime)}
          end
        else
          if f.cover.attached?
            @feature = {url: page_online_issue_path(@page.id, f.id), title: f.title, cover: polymorphic_url(f.cover.variant(resize_to_limit: [1000, 1000])), date: f.created_at.to_s(:custom_datetime)}
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
            @content.push({url: page_offline_issue_path(@page.id, issue.id), cover: polymorphic_url(issue.cover.variant(resize_to_limit: [1000, 1000])), title: issue.title, date: issue.publish_date})
          else
            @content.push({url: page_offline_issue_path(@page.id, issue.id), title: issue.title, date: issue.publish_date})
          end
        else
          if issue.cover.attached?
            @content.push({url: page_online_issue_path(@page.id, issue.id), cover: polymorphic_url(issue.cover.variant(resize_to_limit: [1000, 1000])), title: issue.title, date: issue.created_at.to_s(:custom_datetime)})
          else
            @content.push({url: page_online_issue_path(@page.id, issue.id), title: issue.title, date: issue.created_at.to_s(:custom_datetime)})
          end
        end
      end

      f = @page.online_issues.find_by(featured: true) || @page.offline_issues.find_by(featured: true)
      if f
        puts 'Title :'
        puts f.title
        if f.has_attribute?("publish_date")
          if f.cover.attached?
            @feature = {url: page_offline_issue_path(@page.id, f.id), title: f.title, cover: polymorphic_url(f.cover.variant(resize_to_limit: [1000, 1000])), date: f.created_at.to_s(:custom_datetime)}
          else
            @feature = {url: page_offline_issue_path(@page.id, f.id), title: f.title, date: f.created_at.to_s(:custom_datetime)}
          end
        else
          if f.cover.attached?
            @feature = {url: page_online_issue_path(@page.id, f.id), title: f.title, cover: polymorphic_url(f.cover.variant(resize_to_limit: [1000, 1000])), date: f.created_at.to_s(:custom_datetime)}
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
          @content.push({cover: polymorphic_url(prod.cover.variant(resize_to_limit: [1000, 1000])), title: prod.name, date: prod.release_date, url: prod.purchase_link, caption: prod.price})
        else
          @content.push({title: prod.name, date: prod.release_date, url: prod.purchase_link})
        end
      end
    end
  end

end
