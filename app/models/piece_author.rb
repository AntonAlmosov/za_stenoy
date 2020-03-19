class PieceAuthor < ApplicationRecord
  belongs_to :author
  belongs_to :piece
end
