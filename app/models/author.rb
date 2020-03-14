class Author < ApplicationRecord
  belongs_to :pieces
  belongs_to :offline_issues

  extend FriendlyId
  friendly_id :name, use: :slugged
end
