class OnlineIssueController < ApplicationController
  skip_before_action :verify_authenticity_token
  require 'json'

  def get_online_issues
    @issues = OnlineIssue.where(page_id: params[:id]).sort_by(&:created_at)
    issues = []
    @issues.each do |c|
      issues.push({title: c.title, id: c.id, published: c.published, featured: c.featured})
    end
    render :json => {issues: issues}
  end

  def toggle_issue
    @issue = OnlineIssue.find(params[:id])
    hash = params[:hash]
    @issue[hash] = params[:value]

    if hash == 'featured' and params[:value] == true
      featuredComp = OnlineIssue.find_by(featured: true)
      featuredOffComp = OfflineIssue.find_by(featured: true)
      if featuredComp
        featuredComp.update(featured: false)
      end
      if featuredOffComp
        featuredOffComp.update(featured: false)
      end
    end

    if @issue.save!
      get_online_issues
    end
  end

  def new
    @issue = OnlineIssue.new()
    @issue.published = false
    @issue.featured = false
    @cover = ''
    @post_path = admin_online_issue_index_path
  end

  def create
    issue = OnlineIssue.new()
    issue.title = params[:title]
    issue.published = params[:published]
    issue.featured = params[:featured]
    issue.description = params[:description]
    issue.description_heading = params[:description_heading]

    page = Page.friendly.find(params[:admin_id])

    issue.page_id = page.id

    if params.has_key?(:cover)
      issue.cover = params[:cover]
    end

    pieces = JSON.parse(params[:pieces])

    if issue.featured
      featuredComp = OnlineIssue.find_by(featured: true)
      featuredOffComp = OfflineIssue.find_by(featured: true)
      if featuredComp
        featuredComp.update(featured: false)
      end
      if featuredOffComp
        featuredOffComp.update(featured: false)
      end
    end

    if issue.save!
      pieces.each do |piece|
        PieceOnlineIssue.create(piece_id: piece, online_issue_id: issue.id)
      end

      render :json => {redirectPath: edit_admin_online_issue_path(params[:admin_id], issue.id), id: issue.id}
    end

  end

  def edit 
    @issue = OnlineIssue.find(params[:id])
    @post_path = admin_online_issue_path(params[:admin_id], params[:id])

    @initialPieces = []

    @issue.pieces.each do |piece|
      @initialPieces.push(piece.id)
    end


    @cover = ''
    if @issue.cover.attached?
      @cover =  polymorphic_url(@issue.cover)
    end
  end

  def update
    issue = OnlineIssue.find(params[:id])
    pieces = JSON.parse(params[:pieces])
    issue.featured = params[:featured]

    #Adding new pieces
    pieces.each do |piece|
      present = issue.pieces.any? do |p|
        piece == p.id
      end
      if !present
        PieceOnlineIssue.create(piece_id: piece, online_issue_id: issue.id)
      end
    end

    #Removing pieces 
    issue.pieces.each do |piece|
      present = pieces.any? do |p|
        piece.id == p
      end
      if !present
        PieceOnlineIssue.find_by(piece_id: piece, online_issue_id: issue.id).destroy
      end
    end

    if issue.featured
      featuredComp = OnlineIssue.find_by(featured: true)
      featuredOffComp = OfflineIssue.find_by(featured: true)
      if featuredComp
        featuredComp.update(featured: false)
      end
      if featuredOffComp
        featuredOffComp.update(featured: false)
      end
    end

    if params.has_key?(:cover)
      if issue.update(title: params[:title], published: params[:published], featured: params[:featured], description: params[:description], description_heading: params[:description_heading], cover: params[:cover] )
        render :json => {status: 'ok'}
      end
    else
      if issue.update(title: params[:title], published: params[:published], featured: params[:featured], description: params[:description], description_heading: params[:description_heading])
        render :json => {status: 'ok'}
      end
    end

  end

  def destroy
    issue = OnlineIssue.find(params[:id])

    if issue.cover.attached?
      issue.cover.destroy
    end
    
    connections = PieceOnlineIssue.where(issue_id: issue.id)
    connections.each do |e|
      e.destroy
    end

    if issue.destroy
      get_online_issues
    end

  end
end
