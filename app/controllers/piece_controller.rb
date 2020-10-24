class PieceController < ApplicationController
  skip_before_action :verify_authenticity_token
  require 'json'
  before_action :authenticate_admin!, :except => [:show]

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
    @piece.authors.order(:order).each do |author|
      @authors.push({url: author_path(author.id), name: author.name})
    end

    @edit_path = false
    if admin_signed_in?
      @edit_path = edit_piece_path(@piece.id)
    end
    
    @cover = ''

    if @piece.cover.attached?
      @cover = polymorphic_url(@piece.cover)
    end
  end

  def new
    @piece = Piece.new
    @post_path = piece_index_path
    @back_path = 'js'
  end

  def create
    piece = Piece.new()
    piece.title = params[:title]
    piece.text = params[:text]
    piece.published = params[:published]
    piece.publish_date = params[:publish_date]
    if params.has_key?(:cover) and params[:cover] != 'null'
      piece.cover = params[:cover]
    end
    piece.note = params[:note]
    authors = JSON.parse(params[:authors])

    if piece.save!
      i = 0
      authors.each do |author|
        if PieceAuthor.create(author_id: author['id'], piece_id: piece.id, order: i)
          i = i + 1
        end
      end
      if piece.published
        authors.each do |author|
          foundAuthor = Author.find(author['id'])
          foundAuthor.update(public: true)
        end
      end
      render :json => {redirectPath: edit_piece_path(piece.id), id: piece.id}
    end
  end
  
  def edit
    @piece = Piece.find(params[:id])
    @post_path = piece_path(params[:id])
    @authors = @piece.authors.order(:order)
    @cover = ''
    if @piece.cover.attached?
      @cover =  polymorphic_url(@piece.cover)
    end
    @close_path = piece_path(@piece.id)
    @back_path = admin_index_path
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

    authors.each do |author|
      i = 0
      if PieceAuthor.find_by(author_id: author['id'], piece_id: @piece.id).update!(order: i)
        i = i + 1
      end
    end

    if params.has_key?(:cover)
      if params[:cover] == 'null'
        @piece.cover.purge
      else
        if @piece.update(title: params[:title], note: params[:note], published: params[:published], text: params[:text], publish_date: params[:publish_date], cover: params[:cover] )
          if params[:published] == true
            authors.each do |author|
              foundAuthor = Author.find(author['id'])
              foundAuthor.update(public: true)
            end
          end
          render :json => {status: 'ok'}
        end
      end
    else
      if @piece.update(title: params[:title], note: params[:note], published: params[:published], text: params[:text], publish_date: params[:publish_date] )
        if params[:published] == true
          authors.each do |author|
            foundAuthor = Author.find(author['id'])
            foundAuthor.update(public: true)
          end
        end
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
