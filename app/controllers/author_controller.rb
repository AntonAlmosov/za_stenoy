class AuthorController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
    authors = Author.all
    render :json => {authors: authors}
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
