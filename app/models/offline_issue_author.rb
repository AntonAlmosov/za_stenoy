class OfflineIssueAuthor < ApplicationRecord
  belongs_to :author
  belongs_to :offline_issue
end
