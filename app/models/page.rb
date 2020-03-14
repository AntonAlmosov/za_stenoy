class Page < ApplicationRecord
  has_many :online_issues
  has_many :offline_issues
  has_many :compilations

  extend FriendlyId
  friendly_id :title, use: :slugged
end
