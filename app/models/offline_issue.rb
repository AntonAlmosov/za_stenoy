class OfflineIssue < ApplicationRecord
  belongs_to :page, class_name: "page", foreign_key: "page_id"
  has_many :issue_pages
  
end
