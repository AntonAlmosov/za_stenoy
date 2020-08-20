class AuthorController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_admin!, :except => [:show]
  
  def index
    @close_path = admin_index_path
  end

  def get_authors
    authors = Author.all.sort_by(&:created_at)
    author_collection = []
    
    authors.each do |author|
      author_collection.push({id: author.id, name: author.name, materialsCount: author.pieces.length + author.offline_issues.length, public: author.public})
    end
    render :json => {authors: author_collection}
  end

  def get_author_pieces
    author = Author.find(params[:id])
    render :json => {pieces: author.pieces}
  end

  def edit
    @id = params[:id]
    author = Author.find(params[:id])
    @name = author.name
    @avatar = ''
    @description = author.description
    if author.avatar.attached?
      @avatar = polymorphic_url(author.avatar)
    end
    @post_path = admin_author_path(0, params[:id])
    @origin = 'edit'
    @back_path = admin_author_index_path(0)
  end

  def update
    @author = Author.find(params[:id])
    if params.has_key?(:avatar)
      if @author.update(name: params[:name], avatar: params[:avatar], description: params[:description], public: params[:public])
        render :json => {status: 'ok'}
      end
    else
      if @author.update(name: params[:name], description: params[:description], public: params[:public])
        render :json => {status: 'ok'}
      end
    end
  end

  def update_status
    @author = Author.find(params[:id])
    @author.update(public: params[:public])
    get_authors
  end

  def show
    author = Author.find(params[:id])
    @author = author.as_json
    if author.avatar.attached?
      @author.merge!(avatar: polymorphic_url(author.avatar))
    end
    
    @pieces = []

    author.pieces.each do |piece|
      if piece.published
        if piece.cover.attached?
          @pieces.push({url: piece_path(piece.id), text: piece.text, title: piece.title, date: piece.publish_date, cover: polymorphic_url(piece.cover)})
        else
          @pieces.push({url: piece_path(piece.id), text: piece.text, title: piece.title, date: piece.publish_date})
        end
      end
    end

    author.offline_issues.each do |issue|
      if issue.published
        if issue.cover.attached?
          @pieces.push({url: page_offline_issue_path(issue.page_id, issue.id), title: issue.title, date: issue.publish_date, cover: polymorphic_url(issue.cover)})
        end
      end
    end
  end

  def get_author
    @author = Author.find(params[:id])
    render :json => @author
  end

  def create
    author = Author.new()
    author.name = params[:name]
    author.description = ''
    author.public = false

    if author.save!
      render :json => {author: author}
    end
  end

  def destroy
    author = Author.find(params[:id])
    author_links = PieceAuthor.where(author_id: params[:id])
    if author.destroy
      author_links.each do |link|
        link.destroy
      end

      get_authors
    end
  end

  private
   def author_params
    params.require(:author).permit(:name)
   end
end
