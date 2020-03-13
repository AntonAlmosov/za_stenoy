class CreateIssuePages < ActiveRecord::Migration[6.0]
  def change
    create_table :issue_pages do |t|
      t.string :page_number
      t.integer :offline_issue_id

      t.timestamps
    end
  end
end
