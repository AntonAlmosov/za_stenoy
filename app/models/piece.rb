class Piece < ApplicationRecord
  belongs_to :online_issue, class_name: "online_issue", foreign_key: "online_issue_id"
  belongs_to :compilation, class_name: "compilation", foreign_key: "compilation_id"

  has_one_attached :cover
  has_one :author
end
