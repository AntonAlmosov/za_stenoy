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