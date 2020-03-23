class PageController < ApplicationController
  require 'json'
  def index
    pages = Page.all
    @pages = []
    Time::DATE_FORMATS[:custom_datetime] = "%d.%m.%Y"

    pages.each do |page|
      feature = false
      puts page.page_type
      if page.page_type == 'personal_projects'
        comp = page.compilations.find_by(featured: true)
        if comp
          feature = {title: comp.title, cover: polymorphic_url(comp.cover), date: comp.created_at.to_s(:custom_datetime)}
        end
      end

      if page.page_type == 'magasine' || page.page_type == 'magasine_inversed'
        offline = page.offline_issues.find_by(featured: true)
        online = page.online_issues.find_by(featured: true)

        if offline
          feature = {title: offline.title, cover: polymorphic_url(offline.cover), date: offline.publish_date}
        elsif online
          feature = {title: online.title, cover: polymorphic_url(online.cover), date: online.created_at.to_s(:custom_datetime), caption: 'онлайн выпуск'}
        end
      end

      if page.page_type == 'shop'
        product = page.products.last
        if product
          feature = {title: product.name, cover: polymorphic_url(product.cover), date: product.created_at.to_s(:custom_datetime), caption: product.price}
        end
      end

      @pages.push({id: page.id, slug: page.slug, title: page.title, page_type: page.page_type, feature: feature})
    end
    puts @pages
  end

  def show
    @page = Page.friendly.find(params[:id])
  end
end
