class OfflineIssue < ApplicationRecord
  belongs_to :page
  has_many :oflline_issue_authors
  has_many :authors, through: :offline_issue_authors
  has_many :issue_pages
  
  extend FriendlyId
  friendly_id :title, use: :slugged
end
