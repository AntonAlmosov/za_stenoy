class Piece < ApplicationRecord
  belongs_to :online_issue, class_name: "online_issue", foreign_key: "online_issue_id"
  belongs_to :piece, class_name: "piece", foreign_key: "piece_id"

  has_one_attached :cover
  has_one :author
end
