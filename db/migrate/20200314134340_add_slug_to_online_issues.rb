class AddSlugToOnlineIssues < ActiveRecord::Migration[6.0]
  def change
    add_column :online_issues, :slug, :string
    add_index :online_issues, :slug, unique: true
  end
end
