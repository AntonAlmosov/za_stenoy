class AddOrderToOfflineIssueAuthors < ActiveRecord::Migration[6.0]
  def change
    add_column :offline_issue_authors, :order, :integer
  end
end
