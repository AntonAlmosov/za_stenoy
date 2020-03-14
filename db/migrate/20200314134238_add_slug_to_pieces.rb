class AddSlugToPieces < ActiveRecord::Migration[6.0]
  def change
    add_column :pieces, :slug, :string
    add_index :pieces, :slug, unique: true
  end
end
