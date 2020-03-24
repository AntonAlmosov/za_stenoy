class AuthorController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
    authors = Author.all
    render :json => {authors: authors}
  end

  def show
    @author = Author.find(params[:id])
    
    @pieces = []

    @author.pieces.each do |piece|
      if piece.cover.attached?
        @pieces.push({url: piece_path(piece.id), text: piece.text, title: piece.title, date: piece.publish_date, cover: polymorphic_url(piece.cover)})
      else
        @pieces.push({url: piece_path(piece.id), text: piece.text, title: piece.title, date: piece.publish_date})
      end
    end

    @author.offline_issues.each do |issue|
      if issue.cover.attached?
        @pieces.push({url: page_offline_issue_path(issue.page_id, issue.id), title: issue.title, date: issue.publish_date, cover: polymorphic_url(issue.cover)})
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

  private
   def author_params
    params.require(:author).permit(:name)
   end
end
