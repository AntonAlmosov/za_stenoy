class Page < ApplicationRecord
  has_many :online_issues
  has_many :offline_issues
  has_many :compilations
  has_many :products

  extend FriendlyId
  friendly_id :title, use: :slugged
end
