class Author < ApplicationRecord
  has_many :piece_authors
  has_many :pieces, through: :piece_authors
  has_many :offline_issue_authors
  has_many :offline_issues, through: :offline_issue_authors

  extend FriendlyId
  friendly_id :name, use: :slugged
end
