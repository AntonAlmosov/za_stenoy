class CreateOfflineIssueAuthors < ActiveRecord::Migration[6.0]
  def change
    create_table :offline_issue_authors do |t|
      t.integer :offline_issue_id
      t.integer :author_id
      t.timestamps
    end
  end
end
