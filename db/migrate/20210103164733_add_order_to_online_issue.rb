class AddOrderToOnlineIssue < ActiveRecord::Migration[6.0]
  def change
    add_column :online_issues, :order, :integer
  end
end
