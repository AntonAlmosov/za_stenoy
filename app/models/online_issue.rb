class OnlineIssue < ApplicationRecord
  belongs_to :page
  has_many :pieces
  has_one_attached :cover

  extend FriendlyId
  friendly_id :title, use: :slugged
end
