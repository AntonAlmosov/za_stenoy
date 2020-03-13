class CreateAuthors < ActiveRecord::Migration[6.0]
  def change
    create_table :authors do |t|
      t.string :name
      t.string :offline_issue_id
      t.string :piece_id

      t.timestamps
    end
  end
end
