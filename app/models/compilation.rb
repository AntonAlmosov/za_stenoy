class Compilation < ApplicationRecord
  belongs_to :page, class_name: "page", foreign_key: "page_id"

  has_many :pieces
end
