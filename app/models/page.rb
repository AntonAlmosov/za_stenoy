class Page < ApplicationRecord
  has_many :online_issues
  has_manu :offline_issues
  has_many :compilations
end
