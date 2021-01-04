# Creating default pages
default_pages = 
  [{title: "Авторские проекты", page_type: "personal_projects", description: "", slug: "authors-projects"},
  {title: "«За Стеной»", page_type: "magasine", established: "2018", description: "", slug: "behind-the-wall"},
  {title: "«Флаги»", page_type: "magasine_inversed", established: "2020", description: "", slug: "flags"},
  {title: "Магазин", page_type: "shop", description: "", slug: "shop"},
  {title: "О нас", page_type: "about_us", description: "", slug: "about-us"},
  {title: "Новости", page_type: "news", description: "", slug: "news"}]

default_pages.each do |page|
  if Page.exists?(:slug => page[:slug]) == false
    Page.create(page)
  end
end

Author.all.each do |author|
  if author.public == nil
    author.update(public: true)
  end
  if author.description == nil
    author.update(description: '')
  end
end

##Generating order
Piece.all.each do |piece|
  i = 0
  piece.authors.each do |author|
    if PieceAuthor.find_by(author_id: author.id, piece_id: piece.id).update!(order: i)
      i = i + 1
    end
  end
end

OfflineIssue.all.each do |issue|
  i = 0
  issue.authors.each do |author|
    if OfflineIssueAuthor.find_by(author_id: author.id, offline_issue_id: issue.id).update!(order: i)
      i = i + 1
    end
  end
end

issues = []

OnlineIssue.all.each do |issue|
  issues.push({order: issue.order, id: issue.id, type: 'online'})
end

OfflineIssue.all.each do |issue|
  issues.push({order: issue.order, id: issue.id, type: 'offline'})
end

Compilation.all.each do |issue|
  issues.push({order: issue.order, id: issue.id, type: 'compilation'})
end

isNil = false
issues.each do |issue|
  if issue[:order] == nil
    isNil = true
  end
end

if isNil
  index = 0
  issues.each do |issue|
    found = nil
    if issue[:type] == 'online'
      found = OnlineIssue.find_by(id: issue[:id])
    elsif issue[:type] == 'offline'
      found = OfflineIssue.find_by(id: issue[:id])
    elsif issue[:type] == 'compilation'
      found = Compilation.find_by(id: issue[:id])
    end
    found.update(order: index)
    index = index + 1
  end
end