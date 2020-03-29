class AddOrderToPieceOnlineIssue < ActiveRecord::Migration[6.0]
  def change
    add_column :piece_online_issues, :order, :integer
  end
end
