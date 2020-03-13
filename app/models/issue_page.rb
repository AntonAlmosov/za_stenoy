class IssuePage < ApplicationRecord
  belongs_to :offline_issue, class_name: "offline_issue", foreign_key: "offline_issue_id"

  has_one_attached :page
end
