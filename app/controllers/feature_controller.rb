class FeatureController < ApplicationController
  skip_before_action :verify_authenticity_token
  require 'json'
  before_action :authenticate_admin!

  def index
    @feature = Feature.first
    @content = []

    OfflineIssue.where(published: true).each do |feature|
      @content.push(feature_type: 'offline_issue', origin_id: feature.id, title: feature.title, created_at: feature.created_at)
    end
    OnlineIssue.where(published: true).each do |feature|
      @content.push(feature_type: 'online_issue', origin_id: feature.id, title: feature.title, created_at: feature.created_at)
    end
    Compilation.where(published: true).each do |feature|
      @content.push(feature_type: 'compilation', origin_id: feature.id, title: feature.title, created_at: feature.created_at)
    end
    News.where(published: true).each do |feature|
      @content.push(feature_type: 'news', origin_id: feature.id, title: feature.title, created_at: feature.created_at)
    end
    @content = @content.sort { |a,b| a['created_at'] <=> b['created_at'] }
  end

  def create
    f = Feature.first

    if f
      if f.feature_type == params[:feature_type] and f.origin_id == params[:origin_id]
        Feature.destroy_all
        render :json => {feature_type: '', origin_id: ''}
      else
        Feature.destroy_all
        feature = Feature.new()
        feature.feature_type = params[:feature_type]
        feature.origin_id = params[:origin_id]
    
        if feature.save!
          render :json => {feature_type: feature.feature_type, origin_id: feature.origin_id}
        end
      end
    else
      feature = Feature.new()
      feature.feature_type = params[:feature_type]
      feature.origin_id = params[:origin_id]
  
      if feature.save!
        render :json => {feature_type: feature.feature_type, origin_id: feature.origin_id}
      end
    end

  end
end
