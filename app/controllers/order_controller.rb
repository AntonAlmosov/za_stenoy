class OrderController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_admin!

  def index
    @records = []

    OnlineIssue.where(published: true).each do |issue|
      @records.push({type: 'online', title: issue.title, id: issue.id, order: issue.order})
    end
    Compilation.where(published: true).each do |comp|
      @records.push({type: 'compilation', title: comp.title, id: comp.id, order: comp.order})
    end
    OfflineIssue.where(published: true).each do |issue|
      @records.push({type: 'offline', title: issue.title, id: issue.id, order: issue.order})
    end

    @records.sort_by! { |k| k["order"]}
  end

  def handle_reorder
    records = JSON.parse(params[:records])

    records.each do |record|
      if record['type'] == 'compilation'
          record = Compilation.find(record['id']).update(order: record['order'])
      elsif record['type'] == 'online'
          record = OnlineIssue.find(record['id']).update(order: record['order'])
      elsif record['type'] == 'offline'
          record = OfflineIssue.find(record['id']).update(order: record['order'])
      end
    end
  end
end
