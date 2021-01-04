class AddOrderToOfflineIssue < ActiveRecord::Migration[6.0]
  def change
    add_column :offline_issues, :order, :integer
  end
end
