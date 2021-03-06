class OnlineIssueController < ApplicationController
  skip_before_action :verify_authenticity_token
  require 'json'
  before_action :authenticate_admin!, :except => [:show, :index]

  def get_highest_order
    records = []
    Compilation.all.each do |comp|
      records.push(comp.order)
    end
    OfflineIssue.all.each do |comp|
      records.push(comp.order)
    end
    OnlineIssue.all.each do |comp|
      records.push(comp.order)
    end
    return records.sort.reverse[0]
  end

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
      get_online_issues
    end
  end

  def show
    @issue = OnlineIssue.find(params[:id])

    @cover = ''
    if @issue.cover.attached?
      @cover = polymorphic_url(@issue.cover)
    end
      
    @pieces = []

    @edit_path = false
    if admin_signed_in?
      @edit_path = edit_admin_online_issue_path(@issue.page_id, @issue.id)
    end

    @issue.piece_online_issues.sort_by(&:order).each do |piece_association|
      authors = []
      piece = Piece.find(piece_association.piece_id)
      piece.authors.each do |author|
        authors.push({name: author.name, middlename: author.middlename, url: author_path(author.id)})
      end
      if piece.cover.attached?
        @pieces.push({authors: authors, cover: polymorphic_url(piece.cover), title: piece.title, note: piece.note, text: piece.text, publish_date: piece.publish_date, id: piece.id})
      else
        @pieces.push({authors: authors, title: piece.title, note: piece.note, text: piece.text, publish_date: piece.publish_date, id: piece.id})
      end
    end

  end

  def new
    @issue = OnlineIssue.new()
    @issue.published = false
    @issue.featured = false
    @cover = ''
    @post_path = admin_online_issue_index_path
    @back_path = 'js'
  end

  def create
    issue = OnlineIssue.new()
    issue.title = params[:title]
    issue.dark_mode = params[:dark_mode]
    issue.published = params[:published]
    issue.featured = params[:featured]
    issue.description = params[:description]
    issue.description_heading = params[:description_heading]
    issue.order = get_highest_order() + 1

    page = Page.friendly.find(params[:admin_id])

    issue.page_id = page.id

    if params.has_key?(:cover)
      issue.cover = params[:cover]
    end

    pieces = JSON.parse(params[:pieces])

    if issue.featured
      featuredComp = OnlineIssue.where(page_id: page.id).find_by(featured: true)
      featuredOffComp = OfflineIssue.where(page_id: page.id).find_by(featured: true)
      if featuredComp
        featuredComp.update(featured: false)
      end
      if featuredOffComp
        featuredOffComp.update(featured: false)
      end
    end

    if issue.save!
      pieces.each do |piece|
        PieceOnlineIssue.create(piece_id: piece['id'], online_issue_id: issue.id, order: piece['order'])
        Piece.find(piece['id']).update(published: issue.published)
      end

      render :json => {redirectPath: edit_admin_online_issue_path(params[:admin_id], issue.id), id: issue.id}
    end

  end

  def edit 
    @issue = OnlineIssue.find(params[:id])
    @post_path = admin_online_issue_path(params[:admin_id], params[:id])

    @initialPieces = []

    @close_path = page_online_issue_path(@issue.page_id, @issue.id)
    @back_path = admin_path(@issue.page_id)

    @issue.piece_online_issues.sort_by(&:order).each do |piece_association|
      authors = []
      piece = Piece.find(piece_association.piece_id)
      piece.authors.each do |a|
        authors.push(a.to_json)
      end
      @initialPieces.push({id: piece_association.piece_id, order: piece_association.order, title: piece.title, authors: piece.authors })
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
    page = Page.friendly.find(params[:admin_id])
    #Adding new pieces
    pieces.each do |piece|
      puts piece['order']
      present = issue.pieces.any? do |p|
        piece['id'] == p.id
      end
      Piece.find(piece['id']).update(published: params[:published])
      if !present
        PieceOnlineIssue.create(piece_id: piece['id'], online_issue_id: issue.id, order: piece['order'])
        Piece.find(piece['id']).update(published: params[:published])
      else
        PieceOnlineIssue.find_by(piece_id: piece['id'], online_issue_id: issue.id).update(order: piece['order'])
      end
    end

    #Removing pieces 
    issue.pieces.each do |piece|
      present = pieces.any? do |p|
        piece.id == p['id']
      end
      if !present
        PieceOnlineIssue.find_by(piece_id: piece.id, online_issue_id: issue.id).destroy
      end
    end

    if issue.featured == true
      featuredComp = OnlineIssue.where(page_id: page.id).find_by(featured: true)
      featuredOffComp = OfflineIssue.where(page_id: page.id).find_by(featured: true)

      if featuredComp && featuredComp.id != issue.id
        featuredComp.update(featured: false)
      end
      if featuredOffComp && featuredOffComp.id != issue.id
        featuredOffComp.update(featured: false)
      end
    end

    if params.has_key?(:cover)
      if issue.update(title: params[:title], dark_mode: params[:dark_mode], published: params[:published], featured: params[:featured], description: params[:description], description_heading: params[:description_heading], cover: params[:cover] )
        render :json => {status: 'ok'}
      end
    else
      if issue.update(title: params[:title], dark_mode: params[:dark_mode], published: params[:published], featured: params[:featured], description: params[:description], description_heading: params[:description_heading])
        render :json => {status: 'ok'}
      end
    end

  end

  def destroy
    issue = OnlineIssue.find(params[:id])

    if issue.cover.attached?
      issue.cover.destroy
    end
    
    connections = PieceOnlineIssue.where(online_issue_id: issue.id)
    connections.each do |e|
      e.destroy
    end

    if issue.destroy
      get_online_issues
    end

  end
end
