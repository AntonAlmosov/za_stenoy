class IssuePage < ApplicationRecord
  belongs_to :offline_issue

  has_one_attached :page
end
