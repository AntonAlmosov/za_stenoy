class AuthorController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_admin!, :except => [:show]
  
  def index
    @close_path = admin_index_path
  end

  def get_authors
    authors = Author.all
    render :json => {authors: authors}
  end

  def get_author_pieces
    author = Author.find(params[:id])
    render :json => {pieces: author.pieces}
  end

  def edit
    @id = params[:id]
    @name = Author.find(params[:id]).name
    @post_path = admin_author_path(0, params[:id])
    @origin = 'edit'
    @back_path = admin_author_index_path(0)
  end

  def update
    @author = Author.find(params[:id])
    if @author.update(name: params[:name])
      render :json => {status: 'ok'}
    end
  end

  def show
    @author = Author.find(params[:id])
    
    @pieces = []

    @author.pieces.each do |piece|
      if piece.published
        if piece.cover.attached?
          @pieces.push({url: piece_path(piece.id), text: piece.text, title: piece.title, date: piece.publish_date, cover: polymorphic_url(piece.cover)})
        else
          @pieces.push({url: piece_path(piece.id), text: piece.text, title: piece.title, date: piece.publish_date})
        end
      end
    end

    @author.offline_issues.each do |issue|
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
    author = Author.new(author_params)

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
