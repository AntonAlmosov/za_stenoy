class AddNoteToPiece < ActiveRecord::Migration[6.0]
  def change
    add_column :pieces, :note, :string
  end
end
