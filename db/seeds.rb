# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Page.create(title: "Авторские проекты", page_type: "personal_projects", caption: "", description: "", slug: "authors-projects")
Page.create(title: "«За Стеной»", page_type: "magasine", caption: "литературный журнал «за стеной»\n2018", description: "", slug: "behind-the-wall")
Page.create(title: "«Флаги»", page_type: "magasine_inversed", caption: "СЕТЕВОЙ литературный журнал «Флаги»\n2019", description: "", slug: "flags")
Page.create(title: "«Магазин»", page_type: "shop", caption: "", description: "", slug: "shop")
Page.create(title: "«О нас»", page_type: "about_us", caption: "", description: "", slug: "about-us")