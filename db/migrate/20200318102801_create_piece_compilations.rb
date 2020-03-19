class CreatePieceCompilations < ActiveRecord::Migration[6.0]
  def change
    create_table :piece_compilations do |t|
      t.integer :piece_id
      t.integer :compilation_id
      t.timestamps
    end
  end
end
