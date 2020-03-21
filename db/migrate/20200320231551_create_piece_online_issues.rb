class CreatePieceOnlineIssues < ActiveRecord::Migration[6.0]
  def change
    create_table :piece_online_issues do |t|
      t.integer :piece_id
      t.integer :online_issue_id

      t.timestamps
    end
  end
end
