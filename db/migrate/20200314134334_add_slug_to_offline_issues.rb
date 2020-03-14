class AddSlugToOfflineIssues < ActiveRecord::Migration[6.0]
  def change
    add_column :offline_issues, :slug, :string
    add_index :offline_issues, :slug, unique: true
  end
end
