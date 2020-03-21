class OnlineIssue < ApplicationRecord
  belongs_to :page
  has_one_attached :cover
  has_many :piece_online_issues
  has_many :pieces, through: :piece_online_issues

  extend FriendlyId
  friendly_id :title, use: :slugged
end
