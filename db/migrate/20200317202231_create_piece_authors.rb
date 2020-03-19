class CreatePieceAuthors < ActiveRecord::Migration[6.0]
  def change
    create_table :piece_authors do |t|
      t.integer :piece_id
      t.integer :author_id
      t.timestamps
    end
  end
end
