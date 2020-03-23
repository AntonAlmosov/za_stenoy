class PieceController < ApplicationController
  skip_before_action :verify_authenticity_token
  require 'json'

  def index
    @pieces = Piece.all.sort_by(&:created_at)
    pieces = []
    @pieces.each do |piece|
      pieces.push({id: piece.id, title: piece.title, authors: piece.authors || []})
    end
    render :json => {pieces: pieces}
  end

  def show
    @piece = Piece.find(params[:id])

    @authors = []
    @piece.authors.each do |author|
      @authors.push({url: author_path(author.id), name: author.name})
    end
    
    @cover = ''

    if @piece.cover.attached?
      @cover = polymorphic_url(@piece.cover)
    end
  end

  def new
    @piece = Piece.new
    @post_path = piece_index_path
  end

  def create
    piece = Piece.new()
    piece.title = params[:title]
    piece.text = params[:text]
    piece.publish_date = params[:publish_date]
    if params.has_key?(:cover)
      piece.cover = params[:cover]
    end
    authors = JSON.parse(params[:authors])

    if piece.save!
      authors.each do |author|
        PieceAuthor.create(author_id: author['id'], piece_id: piece.id)
      end
      render :json => {redirectPath: edit_piece_path(piece.id), id: piece.id}
    end
  end
  
  def edit
    @piece = Piece.find(params[:id])
    @post_path = piece_path(params[:id])
    @authors = @piece.authors
    @cover = ''
    if @piece.cover.attached?
      @cover =  polymorphic_url(@piece.cover)
    end
  end

  def update
    @piece = Piece.find(params[:id])
    authors = JSON.parse(params[:authors])
    
    #Adding new authors
    authors.each do |author|
      present = @piece.authors.any? do |a|
        author['id'] == a.id
      end
      if !present
        PieceAuthor.create(author_id: author['id'], piece_id: @piece.id)
      end
    end

    ##Removing old authors
    @piece.authors.each do |author|
      present = authors.any? do |a|
        author['id'] == a['id']
      end
      if !present
        PieceAuthor.find_by(author_id: author['id'], piece_id: @piece.id).destroy
      end
    end

    if params.has_key?(:cover)
      if @piece.update(title: params[:title], text: params[:text], publish_date: params[:publish_date], cover: params[:cover] )
        render :json => {status: 'ok'}
      end
    else
      if @piece.update(title: params[:title], text: params[:text], publish_date: params[:publish_date] )
        render :json => {status: 'ok'}
      end
    end
  end

  def destroy
    @piece = Piece.find(params[:id])
    connections = PieceAuthor.where(piece_id: @piece.id)

    connections.each do |c|
      c.destroy
    end

    if @piece.cover.attached?
      @piece.cover.destroy
    end


    if @piece.destroy
      @pieces = Piece.all
      pieces = []
      @pieces.each do |piece|
        pieces.push({id: piece.id, title: piece.title, authors: piece.authors || []})
      end
      render :json => {pieces: pieces}
    end
  end

  private
  def piece_params
    params.require(:piece).permit(:title, :text, :publish_date)
  end
  
end
