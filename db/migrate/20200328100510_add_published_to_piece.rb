class AddPublishedToPiece < ActiveRecord::Migration[6.0]
  def change
    add_column :pieces, :published, :boolean
  end
end
