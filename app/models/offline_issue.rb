class OfflineIssue < ApplicationRecord
  belongs_to :page
  has_many :offline_issue_authors
  has_many :authors, through: :offline_issue_authors
  has_many :issue_pages

  has_one_attached :cover
  
  extend FriendlyId
  friendly_id :title, use: :slugged
end
