class MenuController < ApplicationController
  def index
    pages = Page.all
    render :json => pages
  end

  def get_data
    authors = []
    Author.all.each do |author| 
      authors.push({url: author_path(author.id), title: author.name})
    end

    pieces = []
    Piece.all.each do |piece|
      pieces.push({url: piece_path(piece.id), title: piece.title})
    end

    projects = []
    Compilation.where(published: true).each do |comp|
      projects.push({url: page_compilation_path(comp.page_id, comp.id), title: comp.title})
    end
    OnlineIssue.where(published: true).each do |issue|
      projects.push({url: page_online_issue_path(issue.page_id, issue.id), title: issue.title})
    end
    OfflineIssue.where(published: true).each do |issue|
      projects.push({url: page_offline_issue_path(issue.page_id, issue.id), title: issue.title})
    end

    render :json => {authors: authors, pieces: pieces, projects: projects}
  end
end
