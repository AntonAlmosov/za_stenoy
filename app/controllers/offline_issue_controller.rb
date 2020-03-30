class OfflineIssueController < ApplicationController
  skip_before_action :verify_authenticity_token
  require 'json'
  before_action :authenticate_admin!, :except => [:show, :index]

  def get_offline_issues
    @issues = OfflineIssue.where(page_id: params[:id]).sort_by(&:created_at)
    issues = []
    @issues.each do |c|
      issues.push({title: c.title, id: c.id, published: c.published, featured: c.featured})
    end
    render :json => {issues: issues}
  end

  def toggle_issue
    @issue = OfflineIssue.find(params[:id])
    hash = params[:hash]
    @issue[hash] = params[:value]
    page = Page.friendly.find(params[:admin_id])

    if hash == 'featured' and params[:value] == true
      @issue.published = true
      featuredComp = OnlineIssue.where(page_id: page.id).find_by(featured: true)
      featuredOffComp = OfflineIssue.where(page_id: page.id).find_by(featured: true)
      if featuredComp
        featuredComp.update(featured: false)
      end
      if featuredOffComp
        featuredOffComp.update(featured: false)
      end
    end

    if @issue.save!
      get_offline_issues
    end
  end

  def handle_pages
    status = params[:status]
    page_number = params[:page_number]
    id = params[:id]
    page = params[:page]
    puts params[:status]

    if status == 'unchanged'
      IssuePage.find(id).update(page_number: page_number)
    end
    if status == 'changed'
      IssuePage.find(id).update(page_number: page_number, page: page)
    end
    if status == 'new'
      IssuePage.create(page_number: page_number, page: page, offline_issue_id: params[:issue_id])
    end
  end

  def delete_page
    IssuePage.find(params[:id]).destroy
  end

  def show
    @issue = OfflineIssue.find(params[:id])
    @pages = [polymorphic_url(@issue.cover)]
    @authors = []

    @edit_path = false
    if admin_signed_in?
      @edit_path = edit_admin_offline_issue_path(@issue.page_id, @issue.id)
    end

    @issue.issue_pages.sort_by(&:page_number).each do |page|
      @pages.push(polymorphic_url(page.page))
    end

    @issue.authors.each do |author|
      @authors.push({url: author_path(author.id), name: author.name})
    end 
  end

  def new
    @issue = OfflineIssue.new()
    @issue.published = false
    @issue.featured = false
    @cover = ''
    @post_path = admin_offline_issue_index_path
    @back_path = 'js'
  end

  def create
    issue = OfflineIssue.new()
    issue.title = params[:title]
    issue.publish_date = params[:publish_date]
    issue.purchase_link = params[:purchase_link]
    issue.published = params[:published]
    issue.featured = params[:featured]
    issue.description = params[:description]

    page = Page.friendly.find(params[:admin_id])

    issue.page_id = page.id

    if params.has_key?(:cover)
      issue.cover = params[:cover]
    end

    authors = JSON.parse(params[:authors])

    if issue.featured
      featuredComp = OnlineIssue.where(page_id: page.id).find_by(featured: true)
      featuredOffComp = OfflineIssue.where(page_id: page.id).find_by(featured: true)
      
      if featuredComp && featuredComp.id != issue.id
        featuredComp.update(featured: false)
      end
      if featuredOffComp && featuredOffComp.id != issue.id
        featuredOffComp.update(featured: false)
      end
    end

    if issue.save!
      authors.each do |author|
        OfflineIssueAuthor.create(author_id: author['id'], offline_issue_id: issue.id)
      end

      render :json => {redirectPath: edit_admin_offline_issue_path(params[:admin_id], issue.id), id: issue.id}
    end

  end

  def edit 
    @issue = OfflineIssue.find(params[:id])
    @post_path = admin_offline_issue_path(params[:admin_id], params[:id])

    @initialAuthors = []
    @initialPages = []

    @close_path = page_offline_issue_path(@issue.page_id, @issue.id)
    @back_path = admin_path(@issue.page_id)

    @issue.authors.each do |author|
      @initialAuthors.push(author.to_json)
    end

    @issue.issue_pages.sort_by(&:page_number).each do |page|
      @initialPages.push({id: page.id, page_number: page.page_number, page: polymorphic_url(page.page), file: nil})
    end


    @cover = ''
    if @issue.cover.attached?
      @cover =  polymorphic_url(@issue.cover)
    end
  end

  def update
    issue = OfflineIssue.find(params[:id])
    authors = JSON.parse(params[:authors])
    issue.featured = params[:featured]
    currentPage = Page.friendly.find(params[:admin_id])

    #Adding new authors
    authors.each do |author|
      present = issue.authors.any? do |a|
        author['id'] == a.id
      end
      if !present
        OfflineIssueAuthor.create(author_id: author['id'], offline_issue_id: issue.id)
      end
    end

    ##Removing old authors
    issue.authors.each do |author|
      present = authors.any? do |a|
        author['id'] == a['id']
      end
      if !present
        OfflineIssueAuthor.find_by(author_id: author['id'], offline_issue_id: issue.id).destroy
      end
    end

    if issue.featured
      featuredComp = OnlineIssue.where(page_id: currentPage.id).find_by(featured: true)
      featuredOffComp = OfflineIssue.where(page_id: currentPage.id).find_by(featured: true)
      if featuredComp
        featuredComp.update(featured: false)
      end
      if featuredOffComp
        featuredOffComp.update(featured: false)
      end
    end

    if params.has_key?(:cover)
      if issue.update(title: params[:title], description: params[:description], publish_date: params[:publish_date], purchase_link: params[:purchase_link], published: params[:published], featured: params[:featured], description: params[:description], cover: params[:cover] )
        render :json => {status: 'ok', id: issue.id}
      end
    else
      if issue.update(title: params[:title], description: params[:description], publish_date: params[:publish_date], purchase_link: params[:purchase_link], published: params[:published], featured: params[:featured], description: params[:description])
        render :json => {status: 'ok', id: issue.id}
      end
    end

  end

  def destroy
    issue = OfflineIssue.find(params[:id])

    if issue.cover.attached?
      issue.cover.destroy
    end

    connections = OfflineIssueAuthor.where(offline_issue_id: issue.id)
    connections.each do |e|
      e.destroy
    end

    pages = IssuePage.where(offline_issue_id: issue.id)
    pages.each do |e|
      e.destroy
    end

    if issue.destroy
      get_online_issues
    end

  end
end
