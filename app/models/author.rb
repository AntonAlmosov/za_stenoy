class Author < ApplicationRecord
  belongs_to :pieces
  belongs_to :offline_issues
end
