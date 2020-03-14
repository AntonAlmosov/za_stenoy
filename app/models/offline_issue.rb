class OfflineIssue < ApplicationRecord
  belongs_to :page
  has_many :issue_pages
  
  extend FriendlyId
  friendly_id :title, use: :slugged
end
