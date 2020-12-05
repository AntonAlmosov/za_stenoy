class AddDarkModeToOnlineIssue < ActiveRecord::Migration[6.0]
  def change
    add_column :online_issues, :dark_mode, :boolean
  end
end
