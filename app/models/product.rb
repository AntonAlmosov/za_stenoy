class Product < ApplicationRecord
  belongs_to :page

  has_one_attached :cover
end
