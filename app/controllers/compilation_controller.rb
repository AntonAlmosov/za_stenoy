class CompilationController < ApplicationController
  skip_before_action :verify_authenticity_token
  require 'json'

  def get_compilations
    @compilations = Compilation.all.sort_by(&:created_at)
    compilations = []
    @compilations.each do |c|
      compilations.push({title: c.title, id: c.id, published: c.published, featured: c.featured})
    end
    render :json => {compilations: compilations}
  end

  def toggle_compilation
    @compilation = Compilation.find(params[:id])
    hash = params[:hash]
    @compilation[hash] = params[:value]

    if hash == 'featured' and params[:value] == true
      featuredComp = Compilation.find_by(featured: true)
      if featuredComp
        featuredComp.update(featured: false)
      end
    end

    if @compilation.save!
      get_compilations
    end
  end

  def new
    @compilation = Compilation.new()
    @compilation.published = false
    @compilation.featured = false
    @cover = ''
    @post_path = admin_compilation_index_path
  end

  def create
    compilation = Compilation.new()
    compilation.title = params[:title]
    compilation.caption = params[:caption]
    compilation.published = params[:published]
    compilation.featured = params[:featured]

    page = Page.friendly.find(params[:admin_id])

    compilation.page_id = page.id

    if params.has_key?(:cover)
      compilation.cover = params[:cover]
    end

    pieces = JSON.parse(params[:pieces])

    if compilation.featured
      featuredComp = Compilation.find_by(featured: true)
      if featuredComp
        featuredComp.update(featured: false)
      end
    end

    if compilation.save!
      pieces.each do |piece|
        PieceCompilation.create(piece_id: piece, compilation_id: compilation.id)
      end

      render :json => {redirectPath: edit_admin_compilation_path(params[:admin_id], compilation.id), id: compilation.id}
    end

  end

  def edit 
    @compilation = Compilation.find(params[:id])
    @post_path = admin_compilation_path(params[:admin_id], params[:id])

    pieceCompilations = PieceCompilation.find_by(compilation_id: @compilation.id)
    @initialPieces = []

    @compilation.pieces.each do |piece|
      @initialPieces.push(piece.id)
    end


    @cover = ''
    if @compilation.cover.attached?
      @cover =  polymorphic_url(@compilation.cover)
    end
  end

  def update
    compilation = Compilation.find(params[:id])
    pieces = JSON.parse(params[:pieces])
    compilation.featured = params[:featured]

    #Adding new pieces
    pieces.each do |piece|
      present = compilation.pieces.any? do |p|
        piece == p.id
      end
      if !present
        PieceCompilation.create(piece_id: piece, compilation_id: compilation.id)
      end
    end

    #Removing pieces 
    compilation.pieces.each do |piece|
      present = pieces.any? do |p|
        piece.id == p
      end
      if !present
        PieceCompilation.find_by(piece_id: piece, compilation_id: compilation.id).destroy
      end
    end

    if compilation.featured
      featuredComp = Compilation.find_by(featured: true)
      if featuredComp
        featuredComp.update(featured: false)
      end
    end

    if params.has_key?(:cover)
      if compilation.update(title: params[:title], caption: params[:caption], published: params[:published], featured: params[:featured], cover: params[:cover] )
        render :json => {status: 'ok'}
      end
    else
      if compilation.update(title: params[:title], caption: params[:caption], published: params[:published], featured: params[:featured])
        render :json => {status: 'ok'}
      end
    end

  end

  def destroy
    compilation = Compilation.find(params[:id])

    connections = PieceCompilation.where(compilation_id: compilation.id)
    connections.each do |e|
      e.destroy
    end

    if compilation.destroy
      get_compilations
    end

  end
end

