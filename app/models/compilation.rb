class Compilation < ApplicationRecord
  has_many :pieces

  belongs_to :page

  has_one_attached :cover

  extend FriendlyId
  friendly_id :title, use: :slugged
end
