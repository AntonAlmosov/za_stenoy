class Compilation < ApplicationRecord
  has_many :piece_compilations
  has_many :pieces, through: :piece_compilations

  belongs_to :page

  has_one_attached :cover

  extend FriendlyId
  friendly_id :title, use: :slugged
end
