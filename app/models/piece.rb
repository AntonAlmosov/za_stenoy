class Piece < ApplicationRecord
  has_many :piece_authors
  has_many :authors, through: :piece_authors
  has_many :piece_compilations
  has_many :compilation, through: :piece_compilations

  has_one_attached :cover
end
